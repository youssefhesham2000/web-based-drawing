package eg.edu.alexu.csd.oop.draw.cs.back;

public class line extends Shape {
    double x2,y2;

    public double getX2() {
        return x2;
    }

    public void setX2(double x2) {
        this.x2 = x2;
    }

    public double getY2() {
        return y2;
    }

    public void setY2(double y2) {
        this.y2 = y2;
    }

    public line(String color, String type, double x1, double y1, int id, double x2, double y2) {
        super(color, type, x1, y1, id);
        this.x2 = x2;
        this.y2 = y2;
    }

}
