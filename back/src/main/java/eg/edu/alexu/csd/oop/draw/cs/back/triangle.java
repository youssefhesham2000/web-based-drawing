package eg.edu.alexu.csd.oop.draw.cs.back;

public class triangle extends Shape{
    double x2,x3,y2,y3;

    public double getX2() {
        return x2;
    }

    public void setX2(double x2) {
        this.x2 = x2;
    }

    public double getX3() {
        return x3;
    }

    public void setX3(double x3) {
        this.x3 = x3;
    }

    public double getY2() {
        return y2;
    }

    public void setY2(double y2) {
        this.y2 = y2;
    }

    public double getY3() {
        return y3;
    }

    public void setY3(double y3) {
        this.y3 = y3;
    }

    public triangle(String color, String type, double x1, double y1, int id, double x2, double x3, double y2,
            double y3) {
        super(color, type, x1, y1, id);
        this.x2 = x2;
        this.x3 = x3;
        this.y2 = y2;
        this.y3 = y3;
    }

}
