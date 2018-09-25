package com.sarpreetsingh.server;

import org.springframework.stereotype.Service;

@Service
public class Mandelbrot {

	public double findComplexReal(double minR, double maxR, int width, int x) {
		return x * ((maxR - minR) / width) + minR;
	}

	public double findComplexImaginary(double minI, double maxI, int height, int y) {
		return y * ((maxI - minI) / height) + minI;
	}

	public int findMandelbrot(double complexReal, double complexImaginary, int iterations) {
		double real = 0.0;
		double imaginary = 0.0;
		int i = 0;
		while (i < iterations && (real * real + imaginary * imaginary > complexReal + complexImaginary)) {
			double temp = real * real - imaginary * imaginary + complexReal;
			imaginary = 2.0 * real * imaginary + complexImaginary;
			real = temp;
			i++;
		}
		return i;
	}
}
