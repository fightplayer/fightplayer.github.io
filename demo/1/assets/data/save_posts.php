<?php
    // フォームから送信されたデータを取得
    $postNumber = $_POST['postNumber'];
    $postAuthor = $_POST['postAuthor'];
    $postTime = $_POST['postTime'];
    $postContent = $_POST['postContent'];

    // csvファイルにデータを追加
    $fp = fopen('/demo/1/assets/data/posts.csv', 'a');
    fputcsv($fp, array($postNumber, $postAuthor, $postTime, $postContent));
    fclose($fp);

    // レスポンスを返す
    echo '投稿が完了しました';
?>
