import "./Github.css";
import axios from "axios";
import { useState } from "react";

function Github() {
    const [name, setName] = useState("");
    const [github, setGithub] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function getGithub() {

        if (name.trim() === "") {
            setError("Please enter a GitHub username");
            return;
        }

        setLoading(true);
        setError("");
        setGithub(null);

        axios
            .get(`https://api.github.com/users/${name}`)
            .then((res) => {
                console.log(res.data);
                setGithub(res.data);
            })
            .catch((error) => {
                console.log(error);

                if (error.response?.status === 404) {
                    setError("GitHub user not found");
                } else {
                    setError("Something went wrong");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="Github-page">

            <div className="Github-card">

                <h1>GitHub Profile</h1>

                <p className="github-subtitle">
                    Search for a GitHub user
                </p>

                {/* Search */}
                <div className="search-container">

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                getGithub();
                            }
                        }}
                        placeholder="Enter GitHub username..."
                        className="search-bar"
                    />

                    <button
                        className="search-button"
                        onClick={getGithub}
                    >
                        Search
                    </button>

                </div>


                {/* Error */}
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                {/* Loading */}
                {loading && (
                    <p className="loading">
                        Loading profile...
                    </p>
                )}


                {/* Profile */}
                {github && !loading && (

                    <div className="details">

                        {/* Profile Header */}
                        <div className="profile-header">

                            <img
                                src={github.avatar_url}
                                alt={github.login}
                                className="github-avatar"
                            />

                            <div className="profile-name">

                                <h2>
                                    {github.name || github.login}
                                </h2>

                                <p>
                                    @{github.login}
                                </p>

                            </div>

                        </div>


                        {/* Bio */}
                        <p className="bio">
                            {github.bio || "No bio available"}
                        </p>


                        {/* Stats */}
                        <div className="stats">

                            <div>
                                <strong>
                                    {github.followers}
                                </strong>

                                <span>
                                    Followers
                                </span>
                            </div>

                            <div>
                                <strong>
                                    {github.following}
                                </strong>

                                <span>
                                    Following
                                </span>
                            </div>

                            <div>
                                <strong>
                                    {github.public_repos}
                                </strong>

                                <span>
                                    Repositories
                                </span>
                            </div>

                            <div>
                                <strong>
                                    {github.public_gists}
                                </strong>

                                <span>
                                    Gists
                                </span>
                            </div>

                        </div>


                        {/* Other Information */}
                        <div className="other-info">

                            <p>
                                <strong>Location:</strong>{" "}
                                {github.location || "Not available"}
                            </p>

                            <p>
                                <strong>Company:</strong>{" "}
                                {github.company || "Not available"}
                            </p>

                            <p>
                                <strong>Website:</strong>{" "}
                                {github.blog ? (
                                    <a
                                        href={
                                            github.blog.startsWith("http")
                                                ? github.blog
                                                : `https://${github.blog}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {github.blog}
                                    </a>
                                ) : (
                                    "Not available"
                                )}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {github.email || "Not available"}
                            </p>

                        </div>


                        {/* GitHub Button */}
                        <a
                            href={github.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="github-button"
                        >
                            Open GitHub Profile
                        </a>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Github;
