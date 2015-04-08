echo "type your username of github"
read name
echo "your name is $name setting"
echo "type your password of github"
read password
echo "type your remote repository address,eg:github.com/dayuoba/streaks"
read remoteaddr
echo "setting..."
remote = "https://$name:$password@$remoteaddr"
git remote add pic https://$name:$password@$remoteaddr
echo "done"
