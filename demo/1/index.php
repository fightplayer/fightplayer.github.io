<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $comment = $_POST['comment'];
    $time = date('Y-m-d H:i:s');
    $data = array($time, $name, $comment);
    $file = fopen('data.csv', 'a');
    fputcsv($file, $data);
    fclose($file);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>掲示板</title>
</head>
<body>
    <h1>掲示板</h1>
    <form method="post">
        <label for="name">名前:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="comment">コメント:</label><br>
        <textarea id="comment" name="comment"></textarea><br><br>
        <input type="submit" value="投稿">
    </form>

    <h2>投稿一覧</h2>
    <?php
    if (($handle = fopen("data.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            echo "<p>";
            echo "投稿時間: " . $data[0] . "<br>";
            echo "名前: " . $data[1] . "<br>";
            echo "コメント: " . $data[2];
            echo "</p>";
        }
        fclose($handle);
    }
    ?>
</body>
</html>
