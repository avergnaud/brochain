package fr.brochain.db.comments;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

public enum DAO {
	INSTANCE;
	
	private static final String PERSISTENCE_UNIT_NAME = "toto";
	private EntityManagerFactory factory;
	EntityManager em;
	
	private DAO() {
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
	    em = factory.createEntityManager();
	}
	
	public void create(DBComment comment) {
		em.getTransaction().begin();
		//securite
		Query query = em.createQuery("DELETE FROM DBComment c where c.dateTime < :limit");
		query.setParameter("limit", LocalDateTime.now().minusMinutes(3));
		query.executeUpdate();
		//create
	    em.persist(comment);
	    em.getTransaction().commit();
	}
	
	@SuppressWarnings("unchecked")
	public List<DBComment> readAll() {		
		Query query = em.createQuery("SELECT c FROM DBComment c where c.dateTime > :limit");
		query.setParameter("limit", LocalDateTime.now().minusMinutes(2));
	    return query.getResultList();
	}
	
	public long count() {
		CriteriaBuilder qb = em.getCriteriaBuilder();
		CriteriaQuery<Long> cq = qb.createQuery(Long.class);
		cq.select(qb.count(cq.from(DBComment.class)));
		Number n = em.createQuery(cq).getSingleResult();
		return n.longValue();
	}
}
