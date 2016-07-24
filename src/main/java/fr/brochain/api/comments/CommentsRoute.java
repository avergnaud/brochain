package fr.brochain.api.comments;

import java.time.LocalDateTime;
import java.util.List;

import fr.brochain.db.comments.DAO;
import fr.brochain.db.comments.DBComment;
import spark.Request;
import spark.Response;

public class CommentsRoute {

	public static List<DBComment> handleGet(Request request, Response response) {
		response.type("application/json");
		return DAO.INSTANCE.readAll();
	}
	
	public static List<DBComment> handlePost(Request request, Response response) {
		
		response.type("application/json");
		
		DBComment comment = new DBComment(request.raw().getParameter("author"),
				request.raw().getParameter("text"),
				LocalDateTime.now());
		
		DAO.INSTANCE.create(comment);
		
		return DAO.INSTANCE.readAll();
	}
}
