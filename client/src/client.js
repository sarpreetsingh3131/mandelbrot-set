import fetch from 'node-fetch'
import fs from 'fs'

export class Client {
  constructor(args) {
    this.minR = args[0]
    this.minI = args[1]
    this.maxR = args[2]
    this.maxI = args[3]
    this.iterations = args[4]
    this.width = args[5]
    this.height = args[6]
    this.division = args[7]
    this.servers = args.splice(Math.max(8, 1))
    this.url = '/mandelbrot/' + this.minR + '/' + this.minI + '/' + this.maxR + '/' + this.maxI + '/' + this.division + '/' + this.division + '/' + this.iterations

    console.log(this)
  }

  start() {
    let work = this.splitWork()
    this.sendWorkToServers(work)
      .then(res => {
        fs.writeFile('mandelbrot.pgm', 'P5\t' + this.width + '\t' + this.height + '\t256\n' +
          res.toString().split(',').join('\t'),
          (err) => err ? console.log(err) : console.log('mandelbrot.pgm is created'))
      })
      .catch(err => console.log(err))
  }

  splitWork() {
    return {
      subPictures: this.width / this.division * this.height / this.division,
      splitValue: (this.width / this.division * this.height / this.division) / this.servers.length
    }
  }

  sendWorkToServers(work) {
    return new Promise((resolve, reject) => {
      let promises = []
      this.servers.map(server => { for (let i = 0; i < work.splitValue; i++) promises.push(this.GET(server)) })
      if (work.splitValue % this.servers.length !== 0) { promises.push(this.GET(this.servers[this.servers.length - 1])) }
      Promise.all(promises)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  GET(server) {
    return new Promise((resolve, reject) => {
      fetch('http://' + server + this.url)
        .then(res => { return res.json() })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}
