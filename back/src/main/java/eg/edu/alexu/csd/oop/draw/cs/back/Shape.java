package eg.edu.alexu.csd.oop.draw.cs.back;

import com.fasterxml.jackson.annotation.*;



@JsonTypeInfo(  
    use = JsonTypeInfo.Id.NAME,  
    include = JsonTypeInfo.As.PROPERTY,  
    property = "type",
    visible = true) 
@JsonSubTypes({
	@JsonSubTypes.Type(value = ellipse.class, name = "ellipse"),
	@JsonSubTypes.Type(value = Circle.class, name = "circle"),
	@JsonSubTypes.Type(value = rectangle.class, name = "rectangle"),
	@JsonSubTypes.Type(value = square.class, name = "square"),
	@JsonSubTypes.Type(value = triangle.class, name = "triangle"),
    @JsonSubTypes.Type(value = line.class, name = "line") })

public class Shape {
    String type , color;
    double x1,y1;
	int id;
	public Shape(String type, String color, double x1, double y1, int id) {
		this.type = type;
		this.color = color;
		this.x1 = x1;
		this.y1 = y1;
		this.id = id;
	}

	public  Shape (){

	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
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
	
    
}
