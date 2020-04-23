import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class seleniumTest extends Thread {
    public static void main(String[] args) {
        List<String> test = new ArrayList<>();

        String url = "http://localhost:3000/";
        WebDriver driver;
        System.setProperty("webdriver.chrome.driver", "chromedriver");
        ChromeOptions options = new ChromeOptions();
        options.addArguments(new String[]{"--headless"});
        driver = new ChromeDriver(options);

        driver.get(url);
        driver.manage().window().maximize();

       // --------- Navbar Test -------------
        test.add("CHECKING NAVBAR LINKS");

        List<WebElement> navLinks = driver.findElements(By.tagName("a"));
        String linkURL;
        for (WebElement link : navLinks) {
            linkURL = link.getAttribute("href");
            try {

                //System.out.println("Current link: " + linkURL);
                WebDriver linkDriver;
                System.setProperty("webdriver.chrome.driver", "chromedriver");             //   System.out.println("title of page is: " + driver.findElement(By.tagName("h1")).getText());
                ChromeOptions linkOptions = new ChromeOptions();
                linkOptions.addArguments(new String[]{"--headless"});
                linkDriver = new ChromeDriver(linkOptions);
                linkDriver.get(linkURL);

                test.add("Checking link: " + linkURL + "--- PASSED");

                linkDriver.quit();
            }catch (Exception e){
                //System.out.println(e);
                //System.out.println("Could not access link");
                test.add("Checking link: " + linkURL + "--- FAILED");
            }
        }

        // ------ Testing Player Search ------
        System.out.println("Testing Player Search ...");
        test.add("PLAYER SEARCH TEST");
        List<String> playersToSearch = new ArrayList<>(Arrays.asList("Mike Dunn", "Buster Posey", "Chaz Roe"));
        int timeout;
        for(String player : playersToSearch) { // loop through players to search for
            timeout = 0;
            WebDriver playerDriver;
            System.setProperty("webdriver.chrome.driver", "chromedriver");             //   System.out.println("title of page is: " + driver.findElement(By.tagName("h1")).getText());
            ChromeOptions linkOptions = new ChromeOptions();
            linkOptions.addArguments(new String[]{"--headless"});
            playerDriver = new ChromeDriver(linkOptions);
            playerDriver.get("http://localhost:3000/players");

            Boolean doneLoading = false;
            while (!doneLoading) // waiting for the players to load in
                try {
                    Thread.sleep(1000);
                    System.out.println(playerDriver.findElement(By.tagName("h1")).getText());
                    doneLoading = true;
                } catch (Exception e) {
                }
            WebElement searchForm = playerDriver.findElement(By.tagName("form"));
            WebElement searchBar = searchForm.findElement(By.id("playerSearch"));
            searchBar.sendKeys(player);
            searchBar.submit();
            //WebElement submit = searchForm.findElement(By.tagName("button"));
            doneLoading = false;
            while (!doneLoading && (timeout<10)) { // searching for player
                try {
                    Thread.sleep(1000);
                    String playerFound = playerDriver.findElement(By.className("card-title")).getText();
                    if(playerFound.equals(player)){
                        test.add("Player Searched For: " + player + " --- PASSED");
                    }else{ // player returned is not player searched for
                        test.add("Player Searched For: " + player + " --- FAILED");
                    }
                    doneLoading = true;
                } catch (Exception e) {
                    timeout++;
                }
                if(timeout >= 10){ // If it takes too long to return a player
                    test.add("Player Searched For: " + player + " --- TIMED OUT");
                }
            }
            playerDriver.quit();
        }

        System.out.println("Testing Team Search ...");
        test.add("PLAYER SEARCH TEST");
        List<String> teamsToSearch = new ArrayList<>(Arrays.asList("Arizona Diamondbacks", "Los Angeles Angels", "Texas Rangers"));

        for(String team : teamsToSearch) { // loop through players to search for
            timeout = 0;
            WebDriver teamDriver;
            System.setProperty("webdriver.chrome.driver", "chromedriver");             //   System.out.println("title of page is: " + driver.findElement(By.tagName("h1")).getText());
            ChromeOptions linkOptions = new ChromeOptions();
            linkOptions.addArguments(new String[]{"--headless"});
            teamDriver = new ChromeDriver(linkOptions);
            teamDriver.get("http://localhost:3000/teams");

            Boolean doneLoading = false;
            while (!doneLoading) // waiting for the players to load in
                try {
                    Thread.sleep(1000);
                    System.out.println("Looking for h1 - Teams");
                    System.out.println(teamDriver.findElement(By.className("titleRow")).getText());
                    doneLoading = true;
                } catch (Exception e) {
                }
            WebElement searchForm = teamDriver.findElement(By.tagName("form"));
            WebElement searchBar = searchForm.findElement(By.id("teamSearch"));
            searchBar.sendKeys(team);
            searchBar.submit();
            //WebElement submit = searchForm.findElement(By.tagName("button"));
            doneLoading = false;
            while (!doneLoading && (timeout<10)) { // searching for player
                try {
                    Thread.sleep(1000);
                    String playerFound = teamDriver.findElement(By.className("card-title")).getText();
                    if(playerFound.equals(team)){
                        test.add("Team Searched For: " + team + " --- PASSED");
                    }else{ // player returned is not player searched for
                        test.add("Team Searched For: " + team + " --- FAILED");
                    }
                    doneLoading = true;
                } catch (Exception e) {
                    timeout++;
                }
                if(timeout >= 10){ // If it takes too long to return a player
                    test.add("Team Searched For: " + team + " --- TIMED OUT");
                }
            }
            teamDriver.quit();
        }

        driver.quit();

        for (String testCase: test){
            System.out.println(testCase);
        }
    }
}
