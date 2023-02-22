// Main Variables
let userInput = document.querySelector('.get-repo input[type="text"]');
let getRepo = document.getElementById("getRepo");
let reposContainer = document.querySelector(".show-data");

// Check Input
getRepo.onclick = function () {
  if (userInput.value === "") {
    // If There's No Input
    reposContainer.innerHTML = `<span class="false">Please Enter Github Username</span>`;
  } else {
    // Emptying Repos Container
    reposContainer.innerHTML = "";

    fetch(`https://api.github.com/users/${userInput.value}/repos`)
      .then((response) => response.json())

      .then((repos) => {
        repos.forEach((repo) => {
          reposContainer.appendChild(createRepo(repo));
        });
      });
  }
};

// Create Repo Function
/**
 * [Accept an object, the object is github repositry]
 * @param  {[object]} repo [GitHub Repositry]
 * @return {[HTMLDivElement]} [Returns A Div Contain Repo Name, Stars And URL]
 */
function createRepo(repo) {
  // Create Main Repo Div
  let mainDiv = document.createElement("div");
  mainDiv.className = "repo";
  //   Create Main Div Text <Repo Name>
  let repoName = document.createTextNode(repo["name"]);
  //   Append Repo Name To Main Div
  mainDiv.appendChild(repoName);

  //   Craete Div That Contains Stars And The URL
  let innerDiv = document.createElement("div");

  // Create Stars Count <span>
  let span = document.createElement("span");
  //   Create Stars Count
  let starsCount = document.createTextNode(`${repo["stargazers_count"]} Stars`);
  // Append Stars Count To Span
  span.appendChild(starsCount);
  // Append Span To Inner Div
  innerDiv.appendChild(span);

  // Create Visit URL <a>
  let anchor = document.createElement("a");
  anchor.innerHTML = "Visit";
  // Set Repo's URL
  anchor.href = repo["html_url"];
  //   Set Target Attribute
  anchor.setAttribute("target", "_blank");
  // Append Anchor To Inner Div
  innerDiv.appendChild(anchor);

  // Append Inner Div To Main Div
  mainDiv.appendChild(innerDiv);

  return mainDiv;
}
