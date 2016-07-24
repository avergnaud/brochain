package fr.brochain.api.comments;

import fr.brochain.db.comments.DAO;
import spark.Request;
import spark.Response;

public class CountRoute {
	public static long handleGet(Request request, Response response) {
		return DAO.INSTANCE.count();
	}
}
