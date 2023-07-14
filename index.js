let data = [];
let savedQueries = [];
let savedArticles = [];
let articleTitles = [];

async function fetchArticle(userInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${userInput}`
    );
    const answer = await response.json();
    console.log(answer);
    data.push(answer);
  } catch (error) {
    console.log("Error:", error);
  }
}
// setTimeout(() => {
//   mainMenu();
// }, 3000);

function getArticles(savedArticles) {
  //this function is not running until I quit/null
  for (item in savedArticles) {
    console.log(savedArticles);
    console.log(item);
    articleTitles.push(savedArticles[item].title);
  }
}

async function mainMenu() {
  console.log("Welcome to the Library!");

  while (true) {
    const mainMenu =
      "Please choose from the following options:\n1: Make a NEW request\n2: View ALL saved articles\n3: Delete ALL articles\n4: View ALL past requests\n5: Quit";

    const userInput = prompt(mainMenu);

    // if (userInput === null) {
    //   mainMenu();
    // } else
    if (userInput === "1") {
      let userInput = await prompt("What would you like to read about?");
      await fetchArticle(userInput);
      savedQueries.push(userInput);
      console.log(savedQueries);
      let saveArtInput = prompt("Would you like to save this article?");
      if (saveArtInput === "y") {
        savedArticles.push(data[0].query.search[0]);
        getArticles(savedArticles);
      } else {
        mainMenu();
      }

      console.log(data[0].query.search[0].title);
    } else if (userInput === "2") {
      console.log(articleTitles);
      console.log("Saved Articles: " + articleTitles);
    } else if (userInput === "3") {
      console.log("Your articles have been deleted.");
    } else if (userInput === "4") {
      console.log(savedQueries);
    } else if (userInput === "5") {
      console.log("Thank you, See you next time!");
      break;
    } else if (userInput === null) {
      console.log("Thank you, See you next time!");
      break;
    }
  }
}

mainMenu();
