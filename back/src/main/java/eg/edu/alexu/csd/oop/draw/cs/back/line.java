package eg.edu.alexu.csd.oop.draw.cs.back;

public class line extends Shape {
    int x2,y2;

    public int getX2() {
        return x2;
    }

    public void setX2(int x2) {
        this.x2 = x2;
    }

    public int getY2() {
        return y2;
    }

    public void setY2(int y2) {
        this.y2 = y2;
    }

    public line(String color, String type, int id, int x1, int y1, int x2, int y2) {
        super(color, type, id, x1, y1);
        this.x2 = x2;
        this.y2 = y2;
    }

}
