// github-feed.js

// Function to fetch GitHub activity and populate the feed
function fetchGitHubActivity() {
    // Replace with your GitHub username and repo name
    const username = "chardelyce";
    const repo = "chardelyce";

    // GitHub API URL for the user's activity feed
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/events`;

    // Map event types to their corresponding actions
    const eventActionMap = {
        PushEvent: "pushed to",
        PullRequestEvent: "opened a pull request in",
        // Add more event types and actions as needed
    };

    // Fetch the GitHub activity data
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const githubFeed = document.getElementById("github-feed");

            // Clear any existing content
            githubFeed.innerHTML = "";

            // Loop through the GitHub activity events
            data.forEach((event) => {
                // Determine the action based on the event type
                const action = eventActionMap[event.type] || "performed an action in";

                // Extract the repository name
                const repoName = event.repo.name || "an unknown repository";

                // Create a new notification item for each event
                const notificationItem = document.createElement("div");
                notificationItem.classList.add("media", "tm-notification-item");

                // Display the event content in white text
                notificationItem.innerHTML = `
                    <p style="color: white;">
                        ${event.actor.login} ${action} <strong>${repoName}</strong>
                    </p>
                `;

                // Append the notification item to the feed
                githubFeed.appendChild(notificationItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching GitHub activity:", error);
        });
}

// Call the function to fetch and display GitHub activity
fetchGitHubActivity();
