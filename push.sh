#!/bin/sh
while read line; do
	name=`echo $line|awk -F '=' '{print $1}'`
	value=`echo $line|awk -F '=' '{print $2}'`
	case $name in
		"name")
			name=$value
			;;
		"pwd")
			pwd=$value
			;;
		*)
			;;
	esac
done < config.cfg
echo $name
echo $pwd

git add --all
git commit -m "commit"
git push auth master
