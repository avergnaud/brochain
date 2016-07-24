package fr.brochain;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFileLocation;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import fr.brochain.api.comments.CommentsRoute;
import fr.brochain.api.comments.CountRoute;

public class Start {
public static void main(String... args) {
	
	Gson gson = new GsonBuilder()
		.setPrettyPrinting()
		.create();

	staticFileLocation("/public");

	get("/hello", (req, res) -> "Hello World");
	
	get("/api/comments", CommentsRoute::handleGet, gson::toJson);
	
	post("/api/comments", CommentsRoute::handlePost, gson::toJson);

	get("/count", CountRoute::handleGet);
}}
