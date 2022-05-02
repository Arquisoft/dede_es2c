package loadTests

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class ListProducts extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList("", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Sat, 30 Apr 2022 17:45:00 GMT",
  		"If-None-Match" -> """W/"286-1807b936cec"""",
  		"Sec-Fetch-Dest" -> "document",
  		"Sec-Fetch-Mode" -> "navigate",
  		"Sec-Fetch-Site" -> "none",
  		"Sec-Fetch-User" -> "?1",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Sat, 30 Apr 2022 17:45:00 GMT",
  		"If-None-Match" -> """W/"839e8-1807b936cf2"""",
  		"Sec-Fetch-Dest" -> "script",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "same-origin"
  )
  
  private val headers_2 = Map(
  		"Cache-Control" -> "max-age=0",
  		"If-None-Match" -> """W/"69a-5K7maot0N11Txe0RSm25krHO5mc"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("ListProducts")
    .exec(
      http("request_0")
        .get("/products")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/static/js/main.d94b278b.js")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":5000/product/list")
            .headers(headers_2)
        )
    )

	setUp(scn.inject(rampUsers(50) during(60 seconds))).
	protocols(httpProtocol)
}
