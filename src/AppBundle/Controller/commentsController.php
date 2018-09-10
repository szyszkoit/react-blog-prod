<?php

namespace AppBundle\Controller;

use AppBundle\Entity\BlogUser;
use AppBundle\Entity\BlogPosts;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Entity\BlogComments;



class commentsController extends Controller
{

    /**
     * @Route("/addcomment", name="addcomment")
     */
    public function addCommentAction(Request $request, UserInterface $user)
    {
        $req = $request->request->all();
        if($this->get('session')->get('api_token')) {
            $entityManager = $this->getDoctrine()->getManager();
            $comment = new BlogComments();
            $comment->setAuthorId($user->getUserId());
            $comment->setPostId($req["_postID"]);
            $comment->setComment($req["_comment"]);
            $comment->setDateAdd(new \Datetime());

            $entityManager->persist($comment);
            $entityManager->flush();

            $result = $user->getUserName();
        }else{
            $result = 'please log in';
        }
        return new Response($result, 200);
    }

    /**
     * @Route("/getpostcomments", name="getpostcomments")
     */
    public function getPostCommentsAction(Request $request)
    {
        $req = $request->request->all();
        //$em = $this->getDoctrine()->getManager();

        $ems = $this->getDoctrine()->getManager()->createQueryBuilder('u')
            ->select('bc.comment', 'bu.userLogin')
            ->from('AppBundle:BlogComments', 'bc')
            ->leftJoin('AppBundle:BlogUser', 'bu', 'WITH', 'bc.authorId = bu.userId')
            ->where("bc.postId = '".$req['_postID']."'" )
            ->getQuery();
        $data = $ems->getArrayResult();

//        $comments = $em->find(
//            array('postId' => $req->get('_postID')),
//            array('dateAdd' => 'ASC')
//        );
        return new Response(json_encode($data, true), 200);
    }
}