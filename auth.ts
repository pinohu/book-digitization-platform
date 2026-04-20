export async function auth() {
  return {
    user: null,
    session: null,
  }
}

export async function signIn() {
  return {
    error: null,
    url: "/dashboard",
  }
}

export async function signOut() {
  return {
    url: "/",
  }
} 