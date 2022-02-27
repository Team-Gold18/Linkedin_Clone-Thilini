import db, { auth, provider, storage } from "../firebase";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES } from "./actionType";

export function signInAPI() {
	return (dispatch) => {
		auth
            .signInWithPopup(provider)
			.then((payload) => {
                dispatch(setUser(payload.user));
            })
            
			.catch((error) => alert(error.message));
	};
}

export function setUser(payload) {
	return {
		type: SET_USER,
		user: payload,
	};
}

export function getUserAuth() {
	return (dispatch) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(setUser(user));
			}
		});
	};
}

export function signOutAPI() {
	return (dispatch) => {
		auth.signOut()
			.then(() => dispatch(setUser(null)))
			.catch((error) => alert(error.message));
	};
}

export function postArticleAPI(payload) {
	return (dispatch) => {
		if (payload.image !== "") {
			dispatch(setLoading(true));
			const upload = storage
			.ref(`images/${payload.image.name}`)
			.put(payload.image);
			upload.on(
				"state_changed",
				(snapshot) => {
					const progress = 
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(err) => alert(err),
				async () => {
					const downloadURL = await upload.snapshot.ref.getDownloadURL();
					db.collection("articles").add({
						actor: {
							description: payload.user.email,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL,
						},
						video: payload.video,
						sharedImg: downloadURL,
						likes: {
							count: 0,
							whoLiked: [],
						},
						comments: 0,
						description: payload.description,
					});
					dispatch(setLoading(false));
				}
			);
		} else if (payload.video) {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: payload.video,
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: 0,
				description: payload.description,
			});
			dispatch(setLoading(false));
		} else if (payload.image === "" && payload.video === "") {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: "",
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: 0,
				description: payload.description,
			});
			dispatch(setLoading(false));
		}
	};
}

export function setLoading(status) {
	return {
		type: SET_LOADING_STATUS,
		status: status,
	};
}

