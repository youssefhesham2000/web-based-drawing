package eg.edu.alexu.csd.oop.draw.cs.back;

public class Circle extends Shape{
    int r1;

    public int getR() {
        return r1;
    }

    public void setR(int r) {
        this.r1 = r;
    }

    public Circle(String color, String type, int id, int x1, int y1, int r1) {
        super(color, type, id, x1, y1);
        this.r1 = r1;
    }

    public boolean equals(Circle c){
        return super.equals(c) && this.r1 == c.getR();
    }

    
}
