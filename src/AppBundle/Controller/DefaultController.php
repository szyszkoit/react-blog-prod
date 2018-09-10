<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/api/{slug}", name="API")
     */
    public function apiAction(Request $request, $slug = null)
    {
        // replace this example code with whatever you need
        // Symfony Backend integration
    }

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request, $slug = null)
    {
        $req = $request->request->all();
        //$req = json_decode($req["username"], true);
        // replace this example code with whatever you need

        return $this->render('default/index.html.twig');
    }
    /**
     * @Route("/", name="errorpage")
     */
    public function errorAction(Request $request, $slug = null)
    {
        $req = $request->request->all();
        //$req = json_decode($req["username"], true);
        // replace this example code with whatever you need


        return $this->render('default/error.html.twig');
    }
}