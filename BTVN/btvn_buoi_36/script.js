let page = 1
const statusElm = document.querySelector(".load-status")

const fetchPosts = async (query = { limit: 12, page: 1 }) => {
    let apiUrl = "/api/posts"
    if (Object.keys(query).length > 0) {
        apiUrl += "?" + new URLSearchParams(query).toString()
    }

    const response = await fetch(apiUrl)

    const data = await response.json()
    return data
}

const createArticleItem = (post) => {
    const article = document.createElement("article")
    article.classList.add("article-item")
    article.innerHTML = `<div class="article-thumb">
        <a href="#">
            <img
                alt="${post.title}"
                data-src="${post.thumb}"
                data-srcset="${post.thumb} 2x, ${post.thumb} 1x"
                height="156"
                src="${post.thumb}"
                width="234" data-ll-status="loaded" class="entered loaded"
                srcset="${post.thumb} 2x, ${post.thumb} 1x"
            />
        </a>
    </div>
    <div class="article-content">
        <h3 class="article-title">
            <a href="#">${post.title}</a>
        </h3>
        <div class="article-excerpt">
            <a href="#">${post.excerpt}</a>
        </div>
    </div>`

    return article
}

const delay = (time) => new Promise((r) => setTimeout(r, time))
const showStatus = () => statusElm.style.display = "block"
const showMessage = (message) => (showStatus(), statusElm.textContent = message)
const hideStatus = () => statusElm.style.display = "none"
const startLoad = () => (showMessage("Đang tải bài viết..."), showStatus())

const loadPosts = async (query) => {
    startLoad()
    await delay(3000)
    try {
        const posts = await fetchPosts(query)
        if (posts.length === 0) {
            return showMessage("Không còn bài viết nào.")
        } else {
            posts.forEach(post => {
                document.querySelector(".article-list").append(createArticleItem(post))
            });
        }
    } catch (error) {
        return showMessage("Đã xảy ra lỗi khi tải bài viết.")
    }
    hideStatus()
}

    ; (async () => {
        await loadPosts()
    })()

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        page++
        loadPosts({ page })
    }
})
