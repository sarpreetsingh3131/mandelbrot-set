package com.sarpreetsingh.server;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

@RestController
@RequestMapping("/mandelbrot")
public class Controller {

	@Autowired
	private Mandelbrot mandelbrot;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{minR}/{minI}/{maxR}/{maxI}/{width}/{height}/{iterations}", produces = "application/json")
	public @ResponseBody ResponseEntity<?> compute(@PathVariable double minR, @PathVariable double minI,
			@PathVariable double maxR, @PathVariable double maxI, @PathVariable int width, @PathVariable int height,
			@PathVariable int iterations) {
		LinkedList<Integer> pixels = new LinkedList<Integer>();

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				int mandelbrot = this.mandelbrot.findMandelbrot(this.mandelbrot.findComplexReal(minR, maxR, width, x),
						this.mandelbrot.findComplexImaginary(minI, maxI, height, y), iterations);
				// RGB
				pixels.add(mandelbrot % 256);
				pixels.add(mandelbrot % 256);
				pixels.add(mandelbrot % 256);
			}
		}
		return ResponseEntity.status(HttpStatus.OK).body(new JSONArray(pixels).toString());
	}
}