<?php
define( '_JEXEC', 1 );
$method = $_SERVER['REQUEST_METHOD'];

if($method == "POST"){
    $requestBody = file_get_contents('php://input');
    $json = json_decode($requestBody);

#extração dos dados do dialog flow
    $nome = $json->queryResult->parameters->Nome;
    $curso = $json->queryResult->parameters->Curso;
    $intent = $json->queryResult->intent->displayName;
    
    if($intent == 'Informação'){
        $infor = strtolower ($json->queryResult->parameters->informacao);
        
        switch($infor){
            case "fim do periodo" :
                $respot = "o final do periodo 2018/1 é 15/07";
                break;
            case "nome do reitor" :
                 $respot = " O nome do reitor é Sylvio Mário Puga Ferreira e do vice reitor é Jacob Moysés Cohen";
                break;
            case "diretor do icomp" :
                $respot = "A diretora do icomp é Tanara Lauschner cuja linha de pesquisa é em inteligencia artificial";
                break;
            case "inicio do proximo periodo" :
                $respot = "o inicio do periodo 2018/2 é 6/08/18 e se finaliza em 23/12/18";
                break;
            default: $respot = "nao cadastrado";
                break;
        }
    }
    if($intent == 'Localização'){
         $local = strtolower (implode("",$json->queryResult->parameters->Locais));
         switch($local){
        case "icomp":
                    $respot = "local:-3.0885149,-59.9648295:".$local;
                        break;
        case "reitoria":
                    $respot = "local:-3.0909594,-59.9663467:".$local;
                        break;
        case "f.d":
                    $respot = "local:-3.088976,-59.9659286:".$local;
                        break;
        case "f.t":
                    $respot = "local:-3.0896027,-59.9648503:".$local;
                        break;
        case "ichl":
                    $respot = "local:-3.09026,-59.9635273:".$local;
                        break;
        case "r.u":
                    $respot = "local:-3.0898522,-59.9640263:".$local;
                        break;
        case "banco do brasil":
                    $respot = "local:-3.0898522,-59.9640263:".$local;
                        break;
        case "ice":
                    $respot = "local:-3.089201,-59.964814:".$local;
                        break;
        case "f.e.s":
                $respot = "local:-3.0918754,-59.9638595:".$local;
                break;
        case "c.p.d":
                $respot = "local:-3.0884236,-59.9649321:".$local;
                break;
        case "departamento de fisica":
                $respot = "local:-3.0886397,-59.9649898:".$local;
                break;
        default:
                $respot = "nao cadastrado";
                break;
        }
    }
   

    $response = new \stdClass();    
    $response->fulfillmentText = $respot;
    $response->source = "webhook";
    echo json_encode($response);
}
else{
    echo "Metodo nao permitido";
}
?>