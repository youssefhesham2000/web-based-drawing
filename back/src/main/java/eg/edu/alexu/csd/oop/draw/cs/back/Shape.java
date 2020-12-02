package eg.edu.alexu.csd.oop.draw.cs.back;

public class Shape {
    String color , type;
    int id,x1,y1;

    public Shape(String color, String type, int id, int x1, int y1) {
        this.color = color;
        this.type = type;
        this.id = id;
        this.x1 = x1;
        this.y1 = y1;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getX1() {
        return x1;
    }

    public void setX1(int x1) {
        this.x1 = x1;
    }

    public int getY1() {
        return y1;
    }

    public void setY1(int y1) {
        this.y1 = y1;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean equals(Shape s){
        return this.id == s.getId() && this.type.equals(s.getType());
    }

    public String toString(){
        return id + " " + type;
    }

}
