import { Client } from './client'

let args = ['-1', '-1.5', '2', '1.5', '1024', '5000', '5000', '1000', 'localhost: 8080'] // dev mode, change if needed

if (process.env.NODE_ENV === 'production') {
  args = process.argv.slice(Math.max(2, 1))
}

if (args.length < 9) {
  console.log('Please provide all the arguments:', '[min_c_re min_c_im max_c_re max_c_im max_n x y divisions list-of-servers]')
  process.exit(1)
}

let client = new Client(args)
client.start()
