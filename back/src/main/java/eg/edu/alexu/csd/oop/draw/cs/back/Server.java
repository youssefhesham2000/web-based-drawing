package eg.edu.alexu.csd.oop.draw.cs.back;

import java.util.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Server {

    static ArrayList<Shape> array = new ArrayList<Shape>(1000);
    ArrayList<ArrayList<Shape>> frames = new ArrayList<ArrayList<Shape>>();
    int currentFrame = 0;
    
    @PostMapping("/draw") 
    @CrossOrigin ( origins = "*" )
    public void draw ( @RequestBody request r ){
        String type = r.getType();
        String color = r.getColor();
        int id = r.getId();
        double x1 = r.getX1();
        double y1 = r.getY1();
        Shape shape = null;
        switch ( type ){

            case ("line") :
            double x2 = r.getX2();
            double y2 = r.getY2();
            shape = new line(color, type, x1, y1, id, x2, y2);
            break;
              
            case ("circle") :
            double r1 = r.getR1();
            shape = new Circle(color, type, x1, y1, id, r1);
            break ;

            case ("ellipse") :
             r1 = r.getR1();
             double r2 = r.getR2();
            shape = new ellipse(color, type, x1, y1, id, r1, r2);
            break;

            case ("triangle") :
             x2 = r.getX2();
             double x3 = r.getX3();
             y2 = r.getY2();
             double y3 = r.getY3();
            shape = new triangle(color, type, x1, y1, id, x2, x3, y2, y3);
            break;

            case ("rectangle") :
            double w = r.getW();
            double h = r.getH();
            shape = new rectangle(color, type, x1, y1, id, w, h);
            break;

            case ("square") :
             w = r.getW();
             h = r.getH();
            shape = new square(color, type, x1, y1, id, w, h);
            break;
         }

         array.add(shape);
         newFrame();
    }

    @PostMapping("/edit") 
    @CrossOrigin ( origins = "*" )
    public void edit ( @RequestBody request r  ) {
        String type = r.getType();
        String color = r.getColor();
        int id = r.getId();
        double x1 = r.getX1();
        double y1 = r.getY1();

        Shape shape = null;
        switch ( type ){

            case ("line") :
            double x2 = r.getX2();
            double y2 = r.getY2();
            shape = new line(color, type, x1, y1, id, x2, y2);
            break;
              
            case ("circle") :
            double r1 = r.getR1();
            shape = new Circle(color, type, x1, y1, id, r1);
            break ;

            case ("ellipse") :
             r1 = r.getR1();
             double r2 = r.getR2();
            shape = new ellipse(color, type, x1, y1, id, r1, r2);
            break;

            case ("triangle") :
             x2 = r.getX2();
             double x3 = r.getX3();
             y2 = r.getY2();
             double y3 = r.getY3();
            shape = new triangle(color, type, x1, y1, id, x2, x3, y2, y3);
            break;

            case ("rectangle") :
            double w = r.getW();
            double h = r.getH();
            shape = new rectangle(color, type, x1, y1, id, w, h);
            break;

            case ("square") :
             w = r.getW();
             h = r.getH();
            shape = new square(color, type, x1, y1, id, w, h);
            break;
         }
         array.set( getIndex(type, id), shape );
         newFrame();
    }

    @PostMapping("/delete") 
    @CrossOrigin ( origins = "*" )
    public void delete ( @RequestBody request r ) {
        int id = r.getId();
        String type = r.getType();
        array.remove(getIndex(type, id)) ;
        newFrame();
    }

    @PostMapping("/undo") 
    @CrossOrigin ( origins = "*" )
    public ArrayList<Shape> undo () {

        if (currentFrame > 0)
            array = (ArrayList<Shape>)frames.get(--currentFrame).clone();
        return array;
    }

    @PostMapping("/redo") 
    @CrossOrigin ( origins = "*" )
    public ArrayList<Shape> redo () {
        if (currentFrame < frames.size() - 1)
            array = frames.get(++currentFrame);
        return array;
    }

    @PostMapping("/frames") 
    @CrossOrigin ( origins = "*" )
    public String printFrames () {
        String test = "current frame : " + currentFrame + "\n";
        for (int i = 0;i < frames.size();i++){
            test += printShapes(frames.get(i));
        }
        return test;
    }

    private void newFrame(){
        if (frames.size() == 0)
            frames.add(new ArrayList<Shape>());
        
        try{
            if ( currentFrame < frames.size() - 1)
            {
                frames.subList( currentFrame+1 , frames.size() ).clear();
            }
            frames.add((ArrayList<Shape>) array.clone());
            currentFrame = frames.size() - 1;
        }
        catch (ClassCastException e){
            System.out.println(e.getLocalizedMessage());
        }
    }

    public int getIndex ( String type , int id){
        for (int i = 0;i < array.size();i++ )
        {
            Shape shape = array.get(i);
            if ( type.equals(shape.getType()) && id == shape.getId() )
                return i ;
        }
        return -1 ;
    }

    private String printShapes(ArrayList<Shape> arr){
        String test = "shapes : \n";
        for (Shape s : arr){
            test += s.getType()  + "  " +  s.getColor()  + "\n";
        }
        return test;
    }
}
