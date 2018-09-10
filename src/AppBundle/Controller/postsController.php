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


class postsController extends Controller
{

    /**
     * @Route("/getposts", name="getposts")
     */
    public function getPostsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            "SELECT c FROM AppBundle:BlogPosts c"
        );
        $result = $query->getArrayResult();
        return new Response(json_encode($result, true), 200);
    }


    /**
     * @Route("getdata/post/{slug}", name="postDetailsData", requirements={"slug" = "[0-9a-zA-Z\/\-]*"})
     */
    public function postDetailsDataAction($slug)
    {
        $ems = $this->getDoctrine()->getManager()->createQueryBuilder()
            ->from('AppBundle:BlogPosts', 'd')
            ->select("d")
            ->where("d.slug = '".$slug."'" )
            ->getQuery();
        $data = $ems->getArrayResult();
        $result = $data;
        return new Response(json_encode($result, true), 200);
    }

    /**
     * @Route("post/{slug}", name="postDetails", requirements={"slug" = "[0-9a-zA-Z\/\-]*"})
     */
    public function postdetailsAction($slug)
    {
        return $this->render('default/index.html.twig');
    }
}