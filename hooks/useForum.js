import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";
import { API_URL } from "../lib/api";
import { normalizeId } from "../lib/normalizeId";

async function publicFetch(path) {
  const res = await fetch(`${API_URL}${path}`);
  return res;
}

export function useForumMeta() {
  const [meta, setMeta] = useState({ scamTypes: [], discussionTags: [] });

  useEffect(() => {
    publicFetch("/api/forum/meta")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setMeta(d);
      })
      .catch(() => {});
  }, []);

  return meta;
}

export function useScamReports() {
  const authedFetch = useAuthedFetch();
  const { getToken, isSignedIn } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/scam-reports`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) setReports(data.reports ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const createReport = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/forum/scam-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to publish");
      await fetchReports();
      return data.report;
    },
    [authedFetch, fetchReports]
  );

  return { reports, loading, refetch: fetchReports, createReport };
}

export function useScamReport(id) {
  const { getToken, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const reportId = normalizeId(id);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    if (!reportId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/scam-reports/${reportId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) setReport(data.report);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [reportId, getToken, isSignedIn]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const addComment = useCallback(
    async (body) => {
      const res = await authedFetch(`/api/forum/scam-reports/${reportId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Comment failed");
      await fetchReport();
      return data.comment;
    },
    [authedFetch, reportId, fetchReport]
  );

  const deleteReport = useCallback(async () => {
    const res = await authedFetch(`/api/forum/scam-reports/${reportId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Delete failed");
  }, [authedFetch, reportId]);

  return { report, loading, addComment, deleteReport, refetch: fetchReport, reportId };
}

export function useDiscussions({ sort = "recent", tag = "" } = {}) {
  const { getToken, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort });
      if (tag) params.set("tag", tag);
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/discussions?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts ?? []);
        setTags(data.tags ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sort, tag, getToken, isSignedIn]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/forum/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to create post");
      await fetchPosts();
      return data.post;
    },
    [authedFetch, fetchPosts]
  );

  return { posts, tags, loading, createPost, refetch: fetchPosts };
}

export function useDiscussion(id) {
  const { getToken, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/discussions/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
        setComments(data.comments ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, getToken, isSignedIn]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const addComment = useCallback(
    async (body, parentId = null) => {
      const res = await authedFetch(`/api/forum/discussions/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, parentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Comment failed");
      await fetchPost();
    },
    [authedFetch, id, fetchPost]
  );

  const toggleLike = useCallback(async () => {
    const res = await authedFetch(`/api/forum/discussions/${id}/like`, { method: "POST" });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Like failed");
    setPost((p) =>
      p ? { ...p, liked: data.liked, likeCount: data.likeCount } : p
    );
  }, [authedFetch, id]);

  return { post, comments, loading, addComment, toggleLike, refetch: fetchPost };
}

export function useSafeCompanies(status = "approved") {
  const { getToken, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/safe-companies?status=${status}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) setCompanies(data.companies ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [status, getToken, isSignedIn]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const createCompany = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/forum/safe-companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to submit");
      await fetchCompanies();
      return data.company;
    },
    [authedFetch, fetchCompanies]
  );

  return { companies, loading, createCompany, refetch: fetchCompanies };
}

export function useSafeCompany(id) {
  const { getToken, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompany = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const token = isSignedIn ? await getToken() : null;
      const res = await fetch(`${API_URL}/api/forum/safe-companies/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) setCompany(data.company);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, getToken, isSignedIn]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const rate = useCallback(
    async (rating, review) => {
      const res = await authedFetch(`/api/forum/safe-companies/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, review }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Rating failed");
      setCompany(data.company);
    },
    [authedFetch, id]
  );

  const flag = useCallback(
    async (reason) => {
      const res = await authedFetch(`/api/forum/safe-companies/${id}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Flag failed");
      setCompany(data.company);
    },
    [authedFetch, id]
  );

  return { company, loading, rate, flag, refetch: fetchCompany };
}
