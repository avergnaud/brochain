package fr.brochain;

import static spark.Spark.get;
import static spark.Spark.port;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Start {
public static void main(String... args) {
	Gson gson = new GsonBuilder()
		.setPrettyPrinting()
		.create();

	port(80);	 

	get("/hello", (req, res) -> "Hello World");
}}
