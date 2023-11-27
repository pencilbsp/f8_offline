function path(root, sublink) {
  return `${root}${sublink}`;
}

export const ROOT = "/";
export const ROOT_AUTH = "/auth";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: path(ROOT_AUTH, "/login"),
};

export const PATH_PAGE = {
  notFound: "/404",
  kanban: "/kanban",
};
