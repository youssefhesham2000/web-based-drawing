package eg.edu.alexu.csd.oop.draw.cs.back;

public class rectangle extends Shape{
    double w,h;

    public double getW() {
        return w;
    }

    public void setW(double w) {
        this.w = w;
    }

    public double getH() {
        return h;
    }

    public void setH(double h) {
        this.h = h;
    }

    public rectangle(String type, String color, double x1, double y1, int id, double w, double h) {
        super(type, color, x1, y1, id);
        this.w = w;
        this.h = h;
    }

    public rectangle() {
    }

    
}
