package eg.edu.alexu.csd.oop.draw.cs.back;

public class square extends Shape{
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

    public square(String color, String type, double x1, double y1, int id, double w, double h) {
        super(color, type, x1, y1, id);
        this.w = w;
        this.h = h;
    }

    
}
