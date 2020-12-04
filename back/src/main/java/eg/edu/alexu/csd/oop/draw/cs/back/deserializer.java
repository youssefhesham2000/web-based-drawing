package eg.edu.alexu.csd.oop.draw.cs.back;

import java.lang.reflect.Type;
import java.util.*;

import com.google.gson.*;

public class deserializer implements JsonDeserializer<Shape> {
    private String shapeTypeElementName;
    private Gson gson;
    private Map<String, Class<? extends Shape>> shapeTypeRegistry;

    public deserializer(String shapeTypeElementName) {
        this.shapeTypeElementName = shapeTypeElementName;
        this.gson = new Gson();
        this.shapeTypeRegistry = new HashMap<>();
    }

    public void registerBarnType(String shapeTypeName, Class<? extends Shape> shapeType) {
        shapeTypeRegistry.put(shapeTypeName, shapeType);
    }

    public Shape deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
        JsonObject shapeObject = json.getAsJsonObject();
        JsonElement shapeTypeElement = shapeObject.get(shapeTypeElementName);

        Class<? extends Shape> ShapeType = shapeTypeRegistry.get(shapeTypeElement.getAsString());
        return gson.fromJson(shapeObject, ShapeType);
    }

}