package eg.edu.alexu.csd.oop.draw.cs.back;

import java.util.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    public String draw ( @RequestBody requestDraw r ){
        String type = r.getType();
        String color = r.getColor();
        int id = r.getId();
        int x1 = r.getX1();
        int y1 = r.getY1();
        Shape shape = null;
        switch ( type ){

            case ("line") :
            int x2 = r.getX2();
            int y2 = r.getY2();
            shape = new line(color, type, id, x1, y1, x2, y2);
            break;
              
            case ("circle") :
            int r1 = r.getR1();
            shape = new Circle(color, type, id, x1, y1, r1);
            break ;

            case ("ellipse") :
             r1 = r.getR1();
            int r2 = r.getR2();
            shape = new ellipse(color, type, id, x1, y1, r1, r2);
            break;

            case ("triangle") :
             x2 = r.getX2();
            int x3 = r.getX3();
             y2 = r.getY2();
            int y3 = r.getY3();
            shape = new triangle(color, type, id, x1, y1, x2, x3, y2, y3);
            break;

            case ("rectangle") :
             x2 = r.getX2();
             x3 = r.getX3();
            int x4 = r.getX4();
             y2 = r.getY2();
             y3 = r.getY3();
            int y4 = r.getY4();
            shape = new rectangle(color, type, id, x1, y1, x2, x3, x4, y2, y3, y4);
            break;

            case ("square") :
             x2 = r.getX2();
             x3 = r.getX3();
             x4 = r.getX4();
             y2 = r.getY2();
             y3 = r.getY3();
             y4 = r.getY4();
            shape = new square(color, type, id, x1, y1, x2, x3, x4, y2, y3, y4);
            break;
         }

         array.add(shape);
         newFrame();

        return printShapes(array) ;
    }

    @PostMapping("/edit") 
    @CrossOrigin ( origins = "*" )
    public String edit ( @RequestBody requestEdit r  ) {
        String type = r.getType();
        String color = r.getColor();
        int id = r.getId();
        int x1 = r.getX1();
        int y1 = r.getY1();

        Shape shape = null;
        switch ( type ){

            case ("line") :
            int x2 = r.getX2();
            int y2 = r.getY2();
            shape = new line(color, type, id, x1, y1, x2, y2);
            break;
              
            case ("circle") :
            int r1 = r.getR1();
            shape = new Circle(color, type, id, x1, y1, r1);
            break ;

            case ("ellipse") :
             r1 = r.getR1();
            int r2 = r.getR2();
            shape = new ellipse(color, type, id, x1, y1, r1, r2);
            break;

            case ("triangle") :
             x2 = r.getX2();
            int x3 = r.getX3();
             y2 = r.getY2();
            int y3 = r.getY3();
            shape = new triangle(color, type, id, x1, y1, x2, x3, y2, y3);
            break;

            case ("rectangle") :
             x2 = r.getX2();
             x3 = r.getX3();
            int x4 = r.getX4();
             y2 = r.getY2();
             y3 = r.getY3();
            int y4 = r.getY4();
            shape = new rectangle(color, type, id, x1, y1, x2, x3, x4, y2, y3, y4);
            break;

            case ("square") :
             x2 = r.getX2();
             x3 = r.getX3();
             x4 = r.getX4();
             y2 = r.getY2();
             y3 = r.getY3();
             y4 = r.getY4();
            shape = new square(color, type, id, x1, y1, x2, x3, x4, y2, y3, y4);
            break;
         }
         array.set( getIndex(type, id), shape );
         newFrame();
         return printShapes(array);
    }

    @PostMapping("/undo") 
    @CrossOrigin ( origins = "*" )
    public Change undo () {


        if (currentFrame > 0){
            Change c = difference(frames.get(currentFrame), frames.get(currentFrame-1));
            array = (ArrayList<Shape>)frames.get(--currentFrame).clone();
            return c;
        }
        
        return new Change(null, null, "oldest frame");
    }

    private Change difference(ArrayList<Shape> frame1, ArrayList<Shape> frame2){
        ArrayList<Shape> total = new ArrayList<Shape>();
        
        total.addAll(frame1);
        total.addAll(frame2);
        

        System.out.println(total.toString());
        while (total.size() > 2){
            for (int i = 0;i < total.size();i++){
                for (int j = 0;j < total.size();j++){
                    Shape x = total.get(i), y = total.get(j); 
                    System.out.println(x.toString() + " = " + y.toString() + "?");
                    if (x.equals(y)){
                        System.out.println("yes!!");
                        total.remove(x);
                        total.remove(y);
                    }
                }
            }
        }
        if (total.size() == 2){
            return new Change(total.get(0), total.get(1), "edit");
        }else {
            if ( frame1.size() > frame2.size() )
                return new Change(total.get(0), null, "delete");
            else 
                return new Change(null, total.get(0), "create");
        }
    }

    @PostMapping("/redo") 
    @CrossOrigin ( origins = "*" )
    public int redo () {
        if (currentFrame < frames.size() - 1){
            array = frames.get(++currentFrame);
        }
        return 0;
    }

    private void newFrame(){
        if (frames.size() == 0){
            frames.add(new ArrayList<Shape>());
            currentFrame = 1;
        }



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



    @PostMapping("/delete") 
    @CrossOrigin ( origins = "*" )
    public String delete ( @RequestBody requestDraw r ) {
        int id = r.getId();
        String type = r.getType();
        array.remove(getIndex(type, id)) ;
        newFrame();
        return printShapes(array);
    }

    @GetMapping("/frames") 
    @CrossOrigin ( origins = "*" )
    public String printFrames () {
        String test = "current frame : " + currentFrame + "\n";
        for (int i = 0;i < frames.size();i++){
            test += printShapes(frames.get(i));
        }
        return test;
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
