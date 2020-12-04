package eg.edu.alexu.csd.oop.draw.cs.back;

public class Circle extends Shape{
    double r1;

	public double getR1() {
		return r1;
	}

	public void setR1(double r1) {
		this.r1 = r1;
	}

	public Circle(String type, String color, double x1, double y1, int id, double r1) {
		super(type, color, x1, y1, id);
		this.r1 = r1;
	}

	public Circle() {
	}

}
