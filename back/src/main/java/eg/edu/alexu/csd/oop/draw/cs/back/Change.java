package eg.edu.alexu.csd.oop.draw.cs.back;

public class Change {
    Shape oldShape, newShape;

    String type;

    public Change(Shape oldShape, Shape newShape, String type) {
        this.oldShape = oldShape;
        this.newShape = newShape;
        this.type = type;
    }

    public Change() {
    }

    public Shape getOldShape() {
        return oldShape;
    }

    public void setOldShape(Shape oldShape) {
        this.oldShape = oldShape;
    }

    public Shape getNewShape() {
        return newShape;
    }

    public void setNewShape(Shape newShape) {
        this.newShape = newShape;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
}
