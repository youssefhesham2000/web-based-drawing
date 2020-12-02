package eg.edu.alexu.csd.oop.draw.cs.back;

public class ellipse extends Shape{
    int r1,r2;

    public int getR1() {
        return r1;
    }

    public void setR1(int r1) {
        this.r1 = r1;
    }

    public int getR2() {
        return r2;
    }

    public void setR2(int r2) {
        this.r2 = r2;
    }

    public ellipse(String color, String type, int id, int x1, int y1, int r1, int r2) {
        super(color, type, id, x1, y1);
        this.r1 = r1;
        this.r2 = r2;
    }

    
}
