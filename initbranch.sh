#!/bin/bash
upstreamName=`git remote|grep -v "origin"`#获取公库名称
upstreamUrl=`git remote -v|grep -v "origin"|grep "fetch"|grep -Eo "http.*git"`#获取公库url




function init(){
    defaltUrl="http:xxxx.git"
    if [ ${2} ];then
     defaltUrl=${2}
     fi
    `git remote add upstream ${2}`
    `git fetch upstream ${1}`
    `git checkout ${1}`
    `git push --set-upstream origin ${1}`
    `git pull upstream ${1}`

     

}

function checkoutBranch(){
    echo `git remote rm $upstreamName`
    echo `git branch -r|grep -v "master\| ${1}"|grep "origin"|xargs git branch -r -d`
    echo `git remote add $upstreamName $upstreamUrl`
	echo `git fetch $upstreamName ${1}`
    `git fetch origin ${1}` >/dev/null
    originBranch=`git branch -r|grep origin|grep ${1}|sed 's/origin\///g'`
    localBranch=`git branch |grep ${1}`#获取当前分支(严谨)：git rev-parse --abbrev-ref HEAD
        #本地和私仓都有该分支
    if [[ ${1} == `echo $originBranch` && `echo $localBranch` == ${1} ]; then
        echo `git checkout ${1}`
        #本地没有但私仓有该分支
    elif [[ ${1} == `echo $originBranch` && `echo $localBranch` != ${1} ]; then
        echo `git checkout --track origin/${1}`
    else
        `git checkout ${1}`
        `git push --set-upstream origin ${1}`
     fi


    echo `git pull $upstreamName ${1}`
     

}
#强制清理指定分支之外的所有本地分支
function clearLocalBranch(){
    `git branch|grep -v "master\| ${1}"|xargs git branch -D`
}

function main()
{


	case $1 in
	"branch")
	checkoutBranch $2
	;;
	"init")
	init $2 $3
	;;

	*)
	echo "Usage: ${0} recovery | backup "
	;;
	esac
}

main $@