package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetComment(w http.ResponseWriter, r *http.Request) {
	commentId := path.Base(r.URL.Path)
	db := database.Connect()

	var res []models.Comments
	database.GetRowById(db, &res, "comments", commentId)

	database.Disconnect(db)
	fmt.Println(res)
}

func GetCommentsByPost(w http.ResponseWriter, r *http.Request) {
	postId := path.Base(r.URL.Path)
	db := database.Connect()

	var res []models.CommentsWithName
	sqlStatement := fmt.Sprintf(`
		SELECT comments.id, comments.commenter, comments.post, comments.comment, comments.date_created, forumusers.name
		FROM comments 
		INNER JOIN forumusers
		ON comments.commenter = forumusers.id
		WHERE comments.post='%s'
		ORDER BY date_created`,
		postId)

	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)

	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	commentId := path.Base(r.URL.Path)

	db := database.Connect()

	database.DeleteById(db, "comments", commentId)

	database.Disconnect(db)
}

func PatchComment(w http.ResponseWriter, r *http.Request) {
	commentId := path.Base(r.URL.Path)
	var comment models.Comments
	err := json.NewDecoder(r.Body).Decode(&comment)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var columns []string
	var values []string
	if comment.Comment != "" {
		columns = append(columns, "comment")
		values = append(values, comment.Comment)
	}
	table := "comments"

	db := database.Connect()

	database.PatchById(db, table, commentId, columns, values)

	database.Disconnect(db)
}

func PostComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comments
	err := json.NewDecoder(r.Body).Decode(&comment)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	columns := []string{"commenter", "post", "comment"}
	values := []string{comment.Commenter, comment.Post, comment.Comment}
	fmt.Println(values)
	table := "comments"

	db := database.Connect()

	database.Insert(db, table, columns, values)

	database.Disconnect(db)
}
