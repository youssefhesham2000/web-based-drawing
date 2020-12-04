
let canvas;
let R1=false;
let R2=false;
let R3=false;
let ctx;
let flag;
let dragging=false;
let draggingEdit=false;
let draggingResize=false;
let currentEdit=''
let Editing=false;
let strokeColor='black';
let fillColor='#A9A9A9';
let line_Width=10;
let currentTool='';
var Squares=[];
var Triangles=[];
var Lines=[];
var Rectangles=[];
var ellipses=[];
var Circles=[];
var shapes=[Circles,ellipses,Rectangles,Lines,Triangles,Squares];
var toEditShape;
let savedImageData;
var oldDX=0;
var oldDY=0;
class shapeBound{
    constructor(left,top,width,height){
        this.left=left;
        this.top=top;
        this.width=width;
        this.height=height;
    }
}
class MouseDownPos{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class location{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let shapeBoundingBox=new shapeBound(0,0,0,0);
let mouseDown=new MouseDownPos(0,0);
let loc =new location(0,0);
document.addEventListener('DOMContentLoaded', setupCanvas);
  

function setupCanvas(){
  
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}

  export default class Method{ 
       changeTool(tool)
    {
        currentTool=tool;
        Editing=false;
        console.log(currentTool);

    }
     editStatus(Edit){
            currentEdit=Edit;
            Editing=true;
            console.log(currentEdit);
            console.log(Editing);
            dragging=false;
        }
         extractFilename(path) {
            if (path.substr(0, 12) == "C:\\fakepath\\")
              return path.substr(12); // modern browser
            var x;
            x = path.lastIndexOf('/');
            if (x >= 0) // Unix-based path
              return path.substr(x+1);
            x = path.lastIndexOf('\\');
            if (x >= 0) // Windows-based path
              return path.substr(x+1);
            return path; // just the file name
          }
          copy(){
            copyShape(toEditShape);
            draw();
          }
          delete(){
            console.log(toEditShape);
            deleteShape(toEditShape);
            this.backEndDelete(toEditShape.shap,toEditShape.index);
            console.log(toEditShape);
            draw();

          }
          changeColor(newColor){
            //fillColor=newColor;
            if(Editing){

                switch(toEditShape.shap.type){
                    case "line":
                           Lines[toEditShape.index].color=newColor;
                     break;
                     case "circle":
                        Circles[toEditShape.index].color=newColor;
                        break;
                     case "square":
                        Squares[toEditShape.index].color=newColor;
                        break;
                     case "rectangle":
                        Rectangles[toEditShape.index].color=newColor;
                         break;       
                     case "ellipse":
                        ellipses[toEditShape.index].color=newColor;
                       
                             break;
                     case "triangle":
                        Triangles[toEditShape.index].color=newColor;
                                            
                     break;        
                }
                
                
                this.backEndEdit(toEditShape.shap,toEditShape.index);
                draw();
                console.log(toEditShape);
                
                
            }
          }
          getShapeReady(shape,ID){
                var returnShape;
            switch(shape.type){
                case "line":
                       returnShape=({x1:shape.x1,x2:shape.x2,y1:shape.y1,y2:shape.y2,type:shape.type,color:shape.color,id:ID})
                 break;
                 case "circle":
                    returnShape=({x1:shape.x,r1:shape.radius,y1:shape.y,type:shape.type,color:shape.color,id:ID})     
                    break;
                 case "square":
                    returnShape=({x1:shape.x,w:shape.width,y1:shape.y,type:shape.type,h:shape.height,color:shape.color,id:ID})     
                    break;
                 case "rectangle":
                    returnShape=({x1:shape.x,w:shape.width,y1:shape.y,type:shape.type,h:shape.height,color:shape.color,id:ID})                    
                     break;       
                 case "ellipse":
                    returnShape=({x1:shape.x,r2:shape.radiusy,y1:shape.y,type:shape.type,r1:shape.radiusx,color:shape.color,id:ID})                    
                   
                         break;
                 case "triangle":
                    returnShape=({type:shape.type,x1:shape.x1,x2:shape.x2,y1:shape.y1,x3:shape.x3,y2:shape.y2,y3:shape.y3,color:shape.color,id:ID})                    
                                        
                 break;        
            }
            return returnShape;
          }
          backEndEdit(shape,ID){
              var returnedShape=this.getShapeReady(shape,ID)
            
            return fetch("http://localhost:8080/edit",
            {
                
                method:'post',
                headers: { "Content-Type": "application/json",
                'Accept': 'application/json'
                },
                    body: JSON.stringify(returnedShape)
        
            }
            )
        }
        setReturnedArray(arrayOfShapes){
            Editing=false;
            for(var i=0;i<arrayOfShapes.length;i++){
                switch(arrayOfShapes[i].type){
                    case "line":
                        Lines[arrayOfShapes[i].id].x1=arrayOfShapes[i].x1;
                        Lines[arrayOfShapes[i].id].x2=arrayOfShapes[i].x2;
                        Lines[arrayOfShapes[i].id].y1=arrayOfShapes[i].y1;
                        Lines[arrayOfShapes[i].id].y2=arrayOfShapes[i].y2;
                        Lines[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                         
                     break;
                     case "circle":
                        Circles[arrayOfShapes[i].id].x=arrayOfShapes[i].x1;
                        Circles[arrayOfShapes[i].id].y=arrayOfShapes[i].y1;
                        Circles[arrayOfShapes[i].id].radius=arrayOfShapes[i].r1;
                        Circles[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                       
                        break;
                     case "square":
                        Squares[arrayOfShapes[i].id].x=arrayOfShapes[i].x1;
                        Squares[arrayOfShapes[i].id].y=arrayOfShapes[i].y1;
                        Squares[arrayOfShapes[i].id].width=arrayOfShapes[i].w;
                        Squares[arrayOfShapes[i].id].height=arrayOfShapes[i].h;
                        Squares[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                       
                        break;
                     case "rectangle":
                        Rectangles[arrayOfShapes[i].id].x=arrayOfShapes[i].x1;
                        Rectangles[arrayOfShapes[i].id].y=arrayOfShapes[i].y1;
                        Rectangles[arrayOfShapes[i].id].width=arrayOfShapes[i].w;
                        Rectangles[arrayOfShapes[i].id].height=arrayOfShapes[i].h;
                        Rectangles[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                       
                         break;       
                     case "ellipse":
                        ellipses[arrayOfShapes[i].id].x=arrayOfShapes[i].x1;
                        ellipses[arrayOfShapes[i].id].y=arrayOfShapes[i].y1;
                        ellipses[arrayOfShapes[i].id].radiusy=arrayOfShapes[i].r2;
                         ellipses[arrayOfShapes[i].id].radiusx=arrayOfShapes[i].r1;
                         ellipses[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                        
                       
                             break;
                     case "triangle":
                        Triangles[arrayOfShapes[i].id].x1=arrayOfShapes[i].x1;
                        Triangles[arrayOfShapes[i].id].y1=arrayOfShapes[i].y1;
                        Triangles[arrayOfShapes[i].id].x2=arrayOfShapes[i].x2;
                        Triangles[arrayOfShapes[i].id].y2=arrayOfShapes[i].y2;
                        Triangles[arrayOfShapes[i].id].x3=arrayOfShapes[i].x3;
                        Triangles[arrayOfShapes[i].id].y3=arrayOfShapes[i].y3;
                        Triangles[arrayOfShapes[i].id].color=arrayOfShapes[i].color;
                        
                                            
                     break;        
                }

            }
            for( i=0;i<shapes.length;i++){
                for( var j=0;j<shapes[i].length;j++){
                    flag=false; 
                    for (let inde = 0; inde < arrayOfShapes.length; inde++) {
                  
                if(arrayOfShapes[inde].type==shapes[i][j].type&&arrayOfShapes[inde].id==j){
                    flag=true;
                    console.log(flag);
                    console.log(shapes[i][j].type);
                   }
                }
                if(flag==false){
                    let index=j;
                    console.log(shapes[i][j].type);
                    switch(shapes[i][j].type){
                        case "line":
                            Lines[index].x1=0;  
                            Lines[index].x2=0;
                            Lines[index].y1=0;
                            Lines[index].y2=0;      
                         break;
                         case "circle":
                             
                            Circles[index].x=0;
                            Circles[index].y=0;
                            Circles[index].radius=0;      
                            break;
                         case "square":
                            console.log(toEditShape.shap.x);
                            Squares[index].x=0;
                            console.log(toEditShape.shap.x);
                            Squares[index].y=0;
                            Squares[index].width=0;               
                            Squares[index].height=0;
                            break;
                         case "rectangle":
                            Rectangles[index].x=0;
                            Rectangles[index].y=0;
                            Rectangles[index].width=0;               
                            Rectangles[index].height=0;
                           
                             break;       
                         case "ellipse":
                            ellipses[index].x=0;
                            ellipses[index].y=0;
                            ellipses[index].radiusx=0;               
                            ellipses[index].radiusy=0;
                           
                                 break;
                         case "triangle":
                            Triangles[index].x1=0;
                            Triangles[index].y1=0;
                            Triangles[index].x2=0;
                            Triangles[index].y2=0;
                            Triangles[index].x3=0;
                            Triangles[index].y3=0;
                         break;        
                    }
                    console.log(shapes);
                    console.log(shapes[i][j]);
                }
                   
               
             
        }
    
    }
    }
    deleteAllShapes(){
        for (let i = 0; i < shapes.length; i++) {
            for (let j = 0; j < shapes[i].length; j++) {
            let index=j;
            console.log(shapes[i][j].type);
            switch(shapes[i][j].type){
                case "line":
                    Lines[index].x1=0;  
                    Lines[index].x2=0;
                    Lines[index].y1=0;
                    Lines[index].y2=0;      
                 break;
                 case "circle":
                     
                    Circles[index].x=0;
                    Circles[index].y=0;
                    Circles[index].radius=0;      
                    break;
                 case "square":
                    
                    Squares[index].x=0;
                    Squares[index].y=0;
                    Squares[index].width=0;               
                    Squares[index].height=0;
                    break;
                 case "rectangle":
                    Rectangles[index].x=0;
                    Rectangles[index].y=0;
                    Rectangles[index].width=0;               
                    Rectangles[index].height=0;
                   
                     break;       
                 case "ellipse":
                    ellipses[index].x=0;
                    ellipses[index].y=0;
                    ellipses[index].radiusx=0;               
                    ellipses[index].radiusy=0;
                   
                         break;
                 case "triangle":
                    Triangles[index].x1=0;
                    Triangles[index].y1=0;
                    Triangles[index].x2=0;
                    Triangles[index].y2=0;
                    Triangles[index].x3=0;
                    Triangles[index].y3=0;
                 break;        
            }
            
        }
    }
}
        backEndUndo(){
            return fetch("http://localhost:8080/undo",
            {
                
                method:'post',
                headers: { "Content-Type": "application/json",
                'Accept': 'application/json'
                },
        
            }
            ).then(response=> response.json())
            .then(body=>{ 
                if(body.length==0){
                    console.log("i am here");
                    this.deleteAllShapes();

                }
                else{
                    console.log(body);
                    this.setReturnedArray(body);
                   
                   
                }
                console.log(body)
  
            }).then(()=> draw()).then(()=>  console.log(shapes))
        }
        backEndRedo(){
          return fetch("http://localhost:8080/redo",
          {
              
              method:'post',
              headers: { "Content-Type": "application/json",
              'Accept': 'application/json'
              },
      
          }
          ).then(response=> response.json())
          .then(body=>{ 
              
                  console.log(body);
                  this.setReturnedArray(body);
              
              console.log(shapes);

          }).then(()=> draw()).then(()=>  console.log(shapes))
      }
        backEndDelete(shape,ID){
            var returnedShape=this.getShapeReady(shape,ID)
          
          return fetch("http://localhost:8080/delete",
          {
              
              method:'post',
              headers: { "Content-Type": "application/json",
              'Accept': 'application/json'
              },
                  body: JSON.stringify(returnedShape)
      
          }
          )
      }
      backEndSaveXML(path){
      return fetch("http://localhost:8080/savexml",
      {
          
          method:'post',
          headers: { "Content-Type": "application/json",
          'Accept': 'application/json'
          },
          body: JSON.stringify(path),
  
      }
      )
  }
  backEndSaveJSON(path){
    return fetch("http://localhost:8080/savejson",
    {
        
        method:'post',
        headers: { "Content-Type": "application/json",
        'Accept': 'application/json'
        },
        body: JSON.stringify(path),

    }
    )
}
  backEndLoadXML(path){
    return fetch("http://localhost:8080/loadxml",
    {
        
        method:'post',
        headers: { "Content-Type": "application/json",
        'Accept': 'application/json'
        },
        body: JSON.stringify(path),

    }
    ).then(response=> response.json())
    .then(body=>{ 
      this.setReturnedArray(body);
    })
}
backEndLoadJSON(path){
    return fetch("http://localhost:8080/loadjson",
    {
        
        method:'post',
        headers: { "Content-Type": "application/json",
        'Accept': 'application/json'
        },
        body: JSON.stringify(path),

    }
    ).then(response=> response.json())
    .then(body=>{ 
      this.setReturnedArray(body);
    })
}

    backEndDraw(shape,ID){
        var returnedShape=this.getShapeReady(shape,ID)
  
          return fetch("http://localhost:8080/draw",
         {
      
                 method:'post',
            headers: { "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(returnedShape),


            }
            )
        }
    }

    let method=new Method();
   function getMousePosition(x,y){
    let canvasSize=canvas.getBoundingClientRect();
    return{x:(x-canvasSize.left)*(canvas.width/canvasSize.width),y:(y-canvasSize.top)*(canvas.height/canvasSize.height)};
   }
   function saveImageData(){
       savedImageData=ctx.getImageData(0,0,canvas.width,canvas.height);
   }
   function reDrawCanvas(){
    ctx.putImageData(savedImageData,0,0)
   }
   function updateRupperBandSizeData(loc){
       shapeBoundingBox.width=Math.abs(loc.x-mouseDown.x);
       shapeBoundingBox.height=Math.abs(loc.y-mouseDown.y);
       if(loc.x>mouseDown.x){
           shapeBoundingBox.left=mouseDown.x;
       }
       else{
           shapeBoundingBox.left=loc.x;
       }
       if(loc.y>mouseDown.y){
        shapeBoundingBox.top=mouseDown.y;
    }
    else{
        shapeBoundingBox.top=loc.y;
    }
   }
   function updateRupperBandOnMove(loc){
    updateRupperBandSizeData(loc);
    var shape=drawRubberBandShape(loc);
    return shape;
   }
   
   function drawRubberBandShape(){
    ctx.strokeStyle=strokeColor;
    var shape;
    if(currentTool=="line"){
        ctx.beginPath();
        ctx.moveTo(mouseDown.x,mouseDown.y);
        ctx.lineTo(loc.x,loc.y);
        ctx.fillStyle= fillColor;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
        shape=({type:"line",x1:mouseDown.x,y1:mouseDown.y,x2:loc.x,y2:loc.y,isDragging:false,color:fillColor});
    }
    else if(currentTool=="triangle"){
        ctx.beginPath();
        ctx.moveTo(mouseDown.x,mouseDown.y);
        ctx.lineTo(loc.x,loc.y);
        ctx.lineTo(Math.abs(mouseDown.x-(loc.x-mouseDown.x)),loc.y)
       ctx.closePath();
       ctx.fillStyle= fillColor;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
        shape=({type:"triangle",x1:mouseDown.x,y1:mouseDown.y,x2:loc.x,y2:loc.y,x3:Math.abs(mouseDown.x-(loc.x-mouseDown.x)),y3:loc.y,isDragging:false,color:fillColor})
    }

    else if(currentTool=="rectangle"){
        ctx.fillRect(shapeBoundingBox.left,shapeBoundingBox.top,shapeBoundingBox.width,shapeBoundingBox.height);
        ctx.fillStyle= fillColor;
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.stroke();
        
    console.log(fillColor)
        shape=({type:"rectangle",x:shapeBoundingBox.left,y:shapeBoundingBox.top,width:shapeBoundingBox.width,height:shapeBoundingBox.height,isDragging:false,color:fillColor})
}
    else if(currentTool=="square"){
        ctx.fillRect(shapeBoundingBox.left,shapeBoundingBox.top,shapeBoundingBox.width,shapeBoundingBox.width);
        ctx.fillStyle= fillColor;
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.stroke();
        shape=({type:"square",x:shapeBoundingBox.left,y:shapeBoundingBox.top,width:shapeBoundingBox.width,height:shapeBoundingBox.width,isDragging:false,color:fillColor})
    }
        else if(currentTool=="circle"){
        let radious=shapeBoundingBox.width;
        ctx.beginPath();
        ctx.arc(mouseDown.x,mouseDown.y,radious,0,Math.PI*2)
        ctx.fillStyle= fillColor;
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.stroke();

        shape=({type:"circle",x:mouseDown.x,y:mouseDown.y,radius:radious,isDragging:false,color:fillColor})
    }
    else if(currentTool=="ellipse"){
        let radiusX=shapeBoundingBox.width/2;
        let radiousY=shapeBoundingBox.height/2;
        ctx.beginPath();
        ctx.ellipse(mouseDown.x,mouseDown.y,radiusX,radiousY,Math.PI/4,0,Math.PI*2)
        ctx.fillStyle= fillColor;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
        shape=({type:"ellipse",x:mouseDown.x,y:mouseDown.y,radiusx:radiusX,radiusy:radiousY,isDragging:false,color:fillColor})
    }
    return shape;
   }
   function clear() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);
  }
  function deleteShape(toEditShape){
    var type=toEditShape.shap.type;
    console.log(type);
    var index=toEditShape.index; 
    switch(type){
        case "line":
            Lines[index].x1=0;  
            Lines[index].x2=0;
            Lines[index].y1=0;
            Lines[index].y2=0;      
         break;
         case "circle":
             
            Circles[index].x=0;
            Circles[index].y=0;
            Circles[index].radius=0;      
            break;
         case "square":
            console.log(toEditShape.shap.x);
            Squares[index].x=0;
            console.log(toEditShape.shap.x);
            Squares[index].y=0;
            Squares[index].width=0;               
            Squares[index].height=0;
            break;
         case "rectangle":
            Rectangles[index].x=0;
            Rectangles[index].y=0;
            Rectangles[index].width=0;               
            Rectangles[index].height=0;
           
             break;       
         case "ellipse":
            ellipses[index].x=0;
            ellipses[index].y=0;
            ellipses[index].radiusx=0;               
            ellipses[index].radiusy=0;
           
                 break;
         case "triangle":
            Triangles[index].x1=0;
            Triangles[index].y1=0;
            Triangles[index].x2=0;
            Triangles[index].y2=0;
            Triangles[index].x3=0;
            Triangles[index].y3=0;
         break;        
    }
  }
  function copyShape(toEditShape){
    var type=toEditShape.shap.type;
    console.log(type);
    var index=toEditShape.index; 
    switch(type){
        case "line":
            var Copied=({type:"line",x1: Lines[index].x1+10,y1: Lines[index].y1+10,x2: Lines[index].x2,y2: Lines[index].y2,isDragging:false,color:Lines[index].color});
            Lines.push(Copied); 
            method.backEndDraw(Copied,Lines.length-1);
            console.log(Lines);
         break;
         case "circle":
            Copied=({type:"circle",x:Circles[index].x+20,y:Circles[index].y+20,radius:Circles[index].radius,isDragging:false,color:Circles[index].color})
             Circles.push(Copied)   
             method.backEndDraw(Copied,Circles.length-1)
            break;
         case "square":
            Copied=({type:"square",x:Squares[index].x+20,y:Squares[index].y+20,width:Squares[index].width,height:Squares[index].height,isDragging:false,color:Squares[index].color})
            Squares.push(Copied);
            method.backEndDraw(Copied,Squares.length-1)
            console.log(Squares);
            break;
         case "rectangle":
            Copied=({type:"rectangle",x:Rectangles[index].x+20,y:Rectangles[index].y+20,width:Rectangles[index].width,height:Rectangles[index].height,isDragging:false,color:Rectangles[index].color})
            Rectangles.push(Copied);
            method.backEndDraw(Copied,Rectangles.length-1)
             break;       
         case "ellipse":
            Copied =({type:"ellipse",x: ellipses[index].x+20,y: ellipses[index].y+20,radiusx: ellipses[index].radiusx,radiusy: ellipses[index].radiusy,isDragging:false,color:ellipses[index].color})
            ellipses.push(Copied);
            method.backEndDraw(Copied,ellipses.length-1)
                 break;
         case "triangle":
             Copied=({type:"triangle",x1:Triangles[index].x1+20,y1:Triangles[index].y1+20,x2:Triangles[index].x2+20,y2:Triangles[index].y2+20,x3:Triangles[index].x3+20,y3:Triangles[index].y3+20,isDragging:false,color:Triangles[index].color})
            console.log(Copied);
            Triangles.push(Copied);
            method.backEndDraw(Copied,Triangles.length-1)
            
         break;        
    }

  }
  function draw() {
    clear();
    updateRupperBandSizeData(loc);
    for(var i=0;i<shapes.length;i++){
      for (let j = 0; j < shapes[i].length; j++) {
        var type=shapes[i][j].type;
        
        switch(type){
            case "line":
                ctx.beginPath();
                ctx.moveTo(shapes[i][j].x1,shapes[i][j].y1);
                ctx.lineTo(shapes[i][j].x2,shapes[i][j].y2);
                ctx.fillStyle= shapes[i][j].color;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
                if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(shapes[i][j].x1,shapes[i][j].y1,6,6);
                    ctx.strokeStyle = "black";
                }
             break;
             case "circle":
                ctx.beginPath();
                ctx.arc(shapes[i][j].x,shapes[i][j].y,shapes[i][j].radius,0,Math.PI*2)
                ctx.fillStyle= shapes[i][j].color;
                ctx.fill();
                ctx.strokeStyle="black";
                ctx.stroke();
                if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(shapes[i][j].x+shapes[i][j].radius,shapes[i][j].y,6,6);
                    ctx.strokeStyle = "black";
                }
                break;
             case "square":
                ctx.fillRect(shapes[i][j].x,shapes[i][j].y,shapes[i][j].width,shapes[i][j].height);
                ctx.fillStyle= shapes[i][j].color;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
                if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(shapes[i][j].x,shapes[i][j].y,6,6);
                    ctx.strokeStyle = "black";
                }
             break;
             case "rectangle":
                ctx.fillRect(shapes[i][j].x,shapes[i][j].y,shapes[i][j].width,shapes[i][j].height);
                ctx.fillStyle= shapes[i][j].color;
                ctx.fill();
                ctx.strokeStyle="black";
                ctx.stroke();
                
             
               
             if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(shapes[i][j].x,shapes[i][j].y,6,6);
                    ctx.strokeStyle = "black";
                    
                }
               
                 break;       
             case "ellipse":
                ctx.beginPath();
                ctx.ellipse(shapes[i][j].x,shapes[i][j].y,shapes[i][j].radiusx,shapes[i][j].radiusy,Math.PI/4,0,Math.PI*2)
                ctx.fillStyle= shapes[i][j].color;
                ctx.fill();
                ctx.strokeStyle="black";
                ctx.stroke();
                if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                   ctx.strokeRect(shapes[i][j].x+shapes[i][j].radiusx,shapes[i][j].y,6,6);
                    ctx.strokeStyle = "black";
                }
                     break;
             case "triangle":
                ctx.beginPath();
                ctx.moveTo(shapes[i][j].x1,shapes[i][j].y1);
                ctx.lineTo(shapes[i][j].x2,shapes[i][j].y2);
                ctx.lineTo(shapes[i][j].x3,shapes[i][j].y3)
               ctx.closePath();
               ctx.fillStyle= shapes[i][j].color;
               ctx.fill();
               ctx.strokeStyle="black";
               ctx.stroke();
                if(shapes[i][j].isDragging){
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(shapes[i][j].x1,shapes[i][j].y1,6,6);
                    ctx.strokeRect(shapes[i][j].x2,shapes[i][j].y2,6,6);
                    ctx.strokeRect(shapes[i][j].x3,shapes[i][j].y3,6,6);
                    ctx.strokeStyle = "black";
                }
                
             break;        
        }
       
    }
     
    }
  }
   function isPointInCircle(x,y,circle){
    var dx=x-circle.x;
    var dy=y-circle.y;
    return(dx*dx+dy*dy<circle.radius*circle.radius);
}
function isPointInLine(x,y,line){
return(Math.floor(Math.sqrt(Math.pow(Math.floor(line.x1-x),2)+Math.pow(Math.floor(line.y1-y),2))+(Math.sqrt(Math.pow(Math.floor(line.x2-x),2)+Math.pow(Math.floor(line.y2-y),2))))==Math.floor((Math.sqrt(Math.pow(Math.floor(line.x2-line.x1),2)+Math.pow(Math.floor(line.y2-line.y1),2)))))
}
function isPointInSquare(x,y,square){
    return(x>square.x&&x<square.x+square.width&&y>square.y&&y<square.y+square.height)
    }
    function area(x1,x2,x3,y1,y2,y3){
        return(Math.abs((x1*(y2-y3) + x2*(y3-y1)+ 
        x3*(y1-y2))/2.0)) 
        }
    function isPointInTriangle(x,y,triangle){
        return(area(triangle.x1,triangle.x2,triangle.x3,triangle.y1,triangle.y2,triangle.y3)==area(triangle.x1,triangle.x2,x,triangle.y1,triangle.y2,y)+area(triangle.x1,x,triangle.x3,triangle.y1,y,triangle.y3)+area(x,triangle.x2,triangle.x3,y,triangle.y2,triangle.y3))
        }
        function isPointInellipse(x,y,ellipse){
            return(((Math.pow((x-ellipse.x),2)/Math.pow(ellipse.radiusx,2))+((Math.pow((y-ellipse.y),2)/Math.pow(ellipse.radiusy,2))))<1)
        }
    
   function shapeEdited(){
    
    switch(currentEdit){
        case "line":
            
            
           for(var i=0;i<Lines.length;i++){
            var rect=({x:Lines[i].x,y:Lines[i].y,width:6,height:6});
            if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                draggingResize=true;
                console.log("here i")
                Lines[i].isDragging=true;
                toEditShape=({shap:Lines[i],index:i})
            }
            else if(isPointInLine(mouseDown.x,mouseDown.y,Lines[i])){
                draggingEdit=true;
                Lines[i].isDragging=true;

                toEditShape=({shap:Lines[i],index:i})

            }
           }
        break;
        case "circle":
            for( i=0;i<Circles.length;i++){
                rect=({x:Circles[i].x+Circles[i].radius,y:Circles[i].y,width:6,height:6});
            if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                draggingResize=true;
                Circles[i].isDragging=true;
                toEditShape=({shap:Circles[i],index:i})
            }
             else if(isPointInCircle(mouseDown.x,mouseDown.y,Circles[i])){
                draggingEdit=true;
                Circles[i].isDragging=true;
                toEditShape=({shap:Circles[i],index:i})
                //call points edit fn
                }
               }
                break;
        case "square":
            for( i=0;i<Squares.length;i++){
                rect=({x:Squares[i].x,y:Squares[i].y,width:6,height:6});
                if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    Squares[i].isDragging=true;
                    toEditShape=({shap:Squares[i],index:i})
                }

                else if(isPointInSquare(mouseDown.x,mouseDown.y,Squares[i])){
                draggingEdit=true;
                Squares[i].isDragging=true;
                toEditShape=({shap:Squares[i],index:i})
                //call points edit fn
                }
               }
        break;
        case "rectangle":
            for( i=0;i<Rectangles.length;i++){
                rect=({x:Rectangles[i].x,y:Rectangles[i].y,width:6,height:6});
                if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    Rectangles[i].isDragging=true;
                    toEditShape=({shap:Rectangles[i],index:i})
                }
                else if(isPointInSquare(mouseDown.x,mouseDown.y,Rectangles[i])){
                draggingEdit=true;
                Rectangles[i].isDragging=true;
                toEditShape=({shap:Rectangles[i],index:i})
                //call points edit fn
                }
               }
            break;       
        case "ellipse":
            for( i=0;i<ellipses.length;i++){
                rect=({x:ellipses[i].x+ellipses[i].radiusx,y:ellipses[i].y,width:10,height:10});
                if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    ellipses[i].isDragging=true;
                    toEditShape=({shap:ellipses[i],index:i})
                }
                else if(isPointInellipse(mouseDown.x,mouseDown.y,ellipses[i])){
                draggingEdit=true;
                ellipses[i].isDragging=true;
                toEditShape=({shap:ellipses[i],index:i})
                //call points edit fn
                }
               }
            break;    
        case "triangle":
            for( i=0;i<Triangles.length;i++){
                rect=({x:Triangles[i].x1,y:Triangles[i].y1,width:6,height:6});
                if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    Triangles[i].isDragging=true;
                    toEditShape=({shap:Triangles[i],index:i})
                    R1=true;
                    console.log(R1);
                }
                rect=({x:Triangles[i].x2,y:Triangles[i].y2,width:6,height:6});
                 if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    Triangles[i].isDragging=true;
                    toEditShape=({shap:Triangles[i],index:i})
                    R2=true;
                }
                rect=({x:Triangles[i].x3+1,y:Triangles[i].y3+1,width:6,height:6});
                if(isPointInSquare(mouseDown.x,mouseDown.y,rect)){
                    draggingResize=true;
                    Triangles[i].isDragging=true;
                    toEditShape=({shap:Triangles[i],index:i})
                    R3=true;
                }

                else if(isPointInTriangle(mouseDown.x,mouseDown.y,Triangles[i])){
                    draggingEdit=true;
                    Triangles[i].isDragging=true;
                    toEditShape=({shap:Triangles[i],index:i})
                }
               }
        break;                 
    }
   }
   function ReactToMouseDown(e){
    canvas.style.cursor="crosshair";
    loc=getMousePosition(e.clientX,e.clientY);
    saveImageData();
    mouseDown.x=loc.x;
    mouseDown.y=loc.y;
    if(Editing){
        shapeEdited(loc);
       
    }else{
        dragging=true;
    }
   
   }
   function ReactToMouseMove(e){
    canvas.style.cursor="crosshair";
    loc=getMousePosition(e.clientX,e.clientY);
    if(dragging){
        reDrawCanvas();
         updateRupperBandOnMove(loc)
    }
    else if(draggingEdit){
        var dx=loc.x-mouseDown.x;
        var dy=loc.y-mouseDown.y;
        Edited(toEditShape,dx,dy)
        oldDY=dy;
        oldDX=dx;
        draw();
    }
    else if(draggingResize){
        dx=loc.x-mouseDown.x;
         dy=loc.y-mouseDown.y;
        ResizeEdited(toEditShape,dx,dy)
        oldDY=dy;
        oldDX=dx;
        draw();

    }
function Edited(toEditShape,dx,dy){
    var type=toEditShape.shap.type;
    switch(type){
        case "line":
            Lines[toEditShape.index].x1+=dx-oldDX;
            Lines[toEditShape.index].y1+=dy-oldDY;
            Lines[toEditShape.index].x2+=dx-oldDX;
            Lines[toEditShape.index].y2+=dy-oldDY;
           
         break;
         case "circle":
            Circles[toEditShape.index].x+=dx-oldDX;
            Circles[toEditShape.index].y+=dy-oldDY;

                 break;
         case "square":
            Squares[toEditShape.index].x+=dx-oldDX;
            Squares[toEditShape.index].y+=dy-oldDY;
         
         break;
         case "rectangle":
            Rectangles[toEditShape.index].x+=dx-oldDX;
            Rectangles[toEditShape.index].y+=dy-oldDY;
             break;       
         case "ellipse":
            ellipses[toEditShape.index].x+=dx-oldDX;
            ellipses[toEditShape.index].y+=dy-oldDY;
                 break;
         case "triangle":
            Triangles[toEditShape.index].x1+=dx-oldDX;
            Triangles[toEditShape.index].y1+=dy-oldDY;
            Triangles[toEditShape.index].x2+=dx-oldDX;
            Triangles[toEditShape.index].y2+=dy-oldDY;
            Triangles[toEditShape.index].x3+=dx-oldDX;
            Triangles[toEditShape.index].y3+=dy-oldDY;
         break;        
    }
}
function ResizeEdited(toEditShape,dx,dy){
    var type=toEditShape.shap.type;
    switch(type){
        case "line":
            Lines[toEditShape.index].x1+=dx-oldDX;
            Lines[toEditShape.index].y1+=dy-oldDY;
            console.log( Lines[toEditShape.index].x1)
         break;
         case "circle":
            Circles[toEditShape.index].radius+=dx-oldDX;
                 break;
         case "square":
            Squares[toEditShape.index].width+=dx-oldDX;
            Squares[toEditShape.index].height+=dx-oldDX;
         
         break;
         case "rectangle":
            Rectangles[toEditShape.index].width+=dx-oldDX;
            Rectangles[toEditShape.index].height+=dy-oldDY;
             break;       
         case "ellipse":
         
            ellipses[toEditShape.index].radiusX+=dx-oldDX;
            ellipses[toEditShape.index].radiusy+=dy-oldDY; 
               
            
                 break;
         case "triangle":
            if(R1){
                Triangles[toEditShape.index].x1+=dx-oldDX;
                Triangles[toEditShape.index].y1+=dy-oldDY;
                }
                 else if(R2){
                Triangles[toEditShape.index].x2+=dx-oldDX;
                Triangles[toEditShape.index].y2+=dy-oldDY;
               
                 }
                 else if(R3){
                Triangles[toEditShape.index].x3+=dx-oldDX;
                Triangles[toEditShape.index].y3+=dy-oldDY;
                
                 }
            
         break;        
    }
}

   }
   function ReactToMouseUp(e){
       R1=false;
       R2=false;
       R3=false;
       canvas.style.cursor="default";
       loc=getMousePosition(e.clientX,e.clientY)
       var newShape;
       if(dragging){
        reDrawCanvas();
         newShape=updateRupperBandOnMove(loc);
         
         if(newShape.type=="line"){
            Lines.push(newShape);
            method.backEndDraw(newShape,Lines.length-1)

        }
         else if(newShape.type=="circle"){
         Circles.push(newShape);
         method.backEndDraw(newShape,Circles.length-1)

     }
     else if(newShape.type=="ellipse"){
         ellipses.push(newShape);
         method.backEndDraw(newShape,ellipses.length-1)
     }
     else if(newShape.type=="triangle"){
         Triangles.push(newShape);
         method.backEndDraw(newShape,Triangles.length-1)
     }
     else if(newShape.type=="square"){
         Squares.push(newShape);
         method.backEndDraw(newShape,Squares.length-1)
     }
     else if(newShape.type=="rectangle"){
         Rectangles.push(newShape);
         method.backEndDraw(newShape,Rectangles.length-1)
     }

       }
       else if(draggingEdit){
           draw();
           toEditShape.shap.isDragging=false;
           method.backEndEdit(toEditShape.shap,toEditShape.index)
           oldDX=0;
           oldDY=0;
//call
       }
       else if(draggingResize){
        draw();
        toEditShape.shap.isDragging=false;
        method.backEndEdit(toEditShape.shap,toEditShape.index)
        oldDX=0;
        oldDY=0;
       }
       draggingResize=false;
       dragging=false;
       draggingEdit=false;
       for(var i=0;i<shapes.length;i++){
        for (let j = 0; j < shapes[i].length; j++) {
          shapes[i][j].isDragging=false;
        }
    }
      
      
   }
    //set up the canvas and context
        

//report the mouse position on click

