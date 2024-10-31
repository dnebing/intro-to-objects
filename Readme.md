# Intro To Objects

This repository is for the Introduction to Liferay Objects workshop.

## Prerequisites

You must have on your local system:

* JDK 21
* Git command line tool
* Blade

## Branches
There are three primary branches:

1. *main*: This branch is the starter branch for those that want to do all of the work themselves.
2. *prepared*: This branch is prepared with the Picklists and Objects pre-created. The only work left to do is the form creation.
3. *completed*: This branch is the completed workshop solution. It's for those that want to attend the workshop, follow along in the steps, but not really do the work directly.

## Preparation

To prepare your local environment, do the following:

```bash
$ git clone git@github.com:dnebing/intro-to-objects.git
$ cd intro-to-objects
$ blade gw initBundle
$ cd bundles
$ tomcat/bin/startup.sh
```

If you want to use a different branch, before the `blade gw initBundle`, issue the command `git checkout prepared` or `git checkout completed`.

## Credentials

In the running environment, there are three users already created:

* `admin@masterclass.com` / `objects` : This is the administrative user.
* `student@masterclass.com` / `student` : This is the student user who will be requesting courses.
* `teacher@masterclass.com` / `teacher` : This is the teacher user who can approve course requests.

Aside from the mentioned permissions, the student and teacher are regular users with no administrative permissions.

## Workshop

See the [Workshop.md](Workshop.md) for the steps to complete the workshop.
