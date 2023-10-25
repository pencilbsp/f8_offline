import { vi } from "https://esm.run/date-fns/locale";
import { formatDistanceToNowStrict, format } from "https://esm.run/date-fns";

export const loadingIcon = `<svg class="loading-icon-spin" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="m25 18c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path d="m25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z" opacity=".3"/><path d="m29 19c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z" opacity=".3"/><path d="m17 39.8c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z" opacity=".3"/><path d="m21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3s1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.2-.3.2-.5.2z" opacity=".93"/><path d="m33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3s1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.1-.3.2-.5.2z" opacity=".3"/><path d="m17 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z" opacity=".65"/><path d="m41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z" opacity=".3"/><path d="m18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z" opacity=".86"/><path d="m38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z" opacity=".3"/><path d="m11.1 33.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3s.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2z" opacity=".44"/><path d="m31.9 21.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3s.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2z" opacity=".3"/></svg>`;
export const postTemplace = ({
  title,
  avatar,
  content,
  userName,
  createdAt,
  userId: { id, name },
}) => {
  const articleElm = document.createElement("article");
  articleElm.classList.add(
    "hover:bg-gray-100",
    "flex",
    "flex-col",
    "px-4",
    "border-b-[1px]"
  );
  articleElm.innerHTML = `
  <div class="pb-3 w-full"></div>
    <div class="flex">
      <div class="flex flex-col flex-shrink-0 items-center basis-[40px] mr-3 flex-grow-0">
        <div class="rounded-full overflow-hidden w-full aspect-square">
          ${createAvatar(name, avatar)}
        </div>
      </div>
      <div class="pb-3 basis-0 flex flex-col flex-grow justify-center">
        <div class="mb-0.5">
          <div class="flex w-full">
            <a href="#" class="hover:underline">
              <span class="font-bold">${name}</span>
            </a>
            <div class="ml-1 text-gray-500">
              <!-- <span>${id}</span> -->
              <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">·</span>
              <time datetime="${createdAt}">${formatDate(createdAt)}</time>
            </div>
          </div>
        </div>
        <div class="break-all">
          ${content}
        </div>
        <div class="mt-3 gap-x-10 flex">
          <div class="group flex cursor-pointer">
            <div class="relative flex justify-center items-center">
              <div
                class="absolute -m-2 transition-colors group-hover:bg-blue-500 inline-flex rounded-full inset-0 z-0 opacity-10">
              </div>
              <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 text-gray-500 group-hover:text-blue-500"
                fill="currentColor">
                <g>
                  <path
                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                  </path>
                </g>
              </svg>
            </div>
            <span class="text-sm px-2 text-gray-500 group-hover:text-blue-500">10</span>
          </div>
          <div class="group flex cursor-pointer">
            <div class="relative flex justify-center items-center">
              <div
                class="absolute -m-2 transition-colors group-hover:bg-pink-500 inline-flex rounded-full inset-0 z-0 opacity-10">
              </div>
              <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 text-gray-500 group-hover:text-pink-500"
                fill="currentColor">
                <g>
                  <path
                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                  </path>
                </g>
              </svg>
            </div>
            <span class="text-sm px-2 text-gray-500 group-hover:text-pink-500">10</span>
          </div>
        </div>
      </div>
  </div>`;

  return articleElm;
};

export function showLoading(isLoading = true) {
  let loadingWrap = document.querySelector(".loading-wrap");
  if (!loadingWrap) {
    loadingWrap = document.createElement("div");
    loadingWrap.classList.add("loading-wrap");
    loadingWrap.innerHTML = loadingIcon;
    document.body.appendChild(loadingWrap);
  }

  loadingWrap.style.display = isLoading ? "flex" : "none";
}

export function formatDate(date, pattern) {
  if (pattern) return format(new Date(date), pattern);
  return formatDistanceToNowStrict(new Date(date), { locale: vi });
}

export function setUser(user) {
  const userBtn = document.getElementById("user-btn");
  const loginBtn = document.getElementById("login-btn");

  if (user) {
    loginBtn.style.display = "none";
  } else {
    userBtn.style.display = "none";
  }
}

export function createAvatar(name, avatar) {
  if (avatar) return `<img alt="" draggable="true" src="${avatar}" />`;
  return `
  <div class="bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-full flex justify-center items-center">
    <span class="text-white font-bold text-lg">${name
      .slice(0, 1)
      .toUpperCase()}</span>
  </div>
  `;
}

export function showPostLoading(isLoading = true) {
  const postBtnElm = document.getElementById("post-btn");
  const text = postBtnElm.children[2];
  const loadingIcon = postBtnElm.children[0];
  const loadingText = postBtnElm.children[1];

  if (isLoading) {
    postBtnElm.setAttribute("disabled", true);
    text.style.display = "none";
    loadingIcon.style.display = "inline-block";
    loadingText.style.display = "inline-block";
  } else {
    postBtnElm.removeAttribute("disabled");
    text.style.display = "inline-block";
    loadingIcon.style.display = "none";
    loadingText.style.display = "none";
  }
}
