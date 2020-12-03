package eg.edu.alexu.csd.oop.draw.cs.back;

public class Shape {
    String color , type;
    double x1,y1;
    int id;
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public double getX1() {
		return x1;
	}
	public void setX1(double x1) {
		this.x1 = x1;
	}
	public double getY1() {
		return y1;
	}
	public void setY1(double y1) {
		this.y1 = y1;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Shape(String color, String type, double x1, double y1, int id) {
		this.color = color;
		this.type = type;
		this.x1 = x1;
		this.y1 = y1;
		this.id = id;
	}
    
}
