package eg.edu.alexu.csd.oop.draw.cs.back;

public class ellipse extends Shape{
    double r1,r2;

    public double getR1() {
        return r1;
    }

    public void setR1(double r1) {
        this.r1 = r1;
    }

    public double getR2() {
        return r2;
    }

    public void setR2(double r2) {
        this.r2 = r2;
    }

    public ellipse(String type, String color, double x1, double y1, int id, double r1, double r2) {
        super(type, color, x1, y1, id);
        this.r1 = r1;
        this.r2 = r2;
    }

    public ellipse() {
    }

    
}
