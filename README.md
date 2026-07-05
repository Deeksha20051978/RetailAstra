## Backend Setup

1. Install MySQL and make sure it's running.
2. Open `backend/src/main/resources/application.properties` and set:
    - `spring.datasource.password` → your MySQL root password
    - `gemini.api.key` → your Gemini API key (get one at https://aistudio.google.com/apikey)
3. Right-click `backend/pom.xml` → Maven → Reload Project
4. Run `RetailAstraApplication.java`
5. Test at http://localhost:8080/products — should return an empty array if it's working.

## Where AI integration lives
- `service/AIService.java` — the only class that calls Gemini directly
- `agents/ChatAgent.java` — powers the `/chat` endpoint
- `agents/RecommendationAgent.java` — powers the `/recommendations/{id}` endpoint
- `util/PromptBuilder.java` — where the Gemini prompts are built (edit here to improve AI responses)

## Where SQL/database logic lives
- `entity/` — the 6 tables (Product, Customer, Order, OrderItem, Inventory, Recommendation)
- `repository/` — Spring Data JPA queries for each table
- Tables auto-create on first run (`spring.jpa.hibernate.ddl-auto=update`) — no manual SQL needed