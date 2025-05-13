package com.pfa2.evaluation_serivce.service;

import com.pfa2.evaluation_serivce.model.TestUnitaire;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class EvaluationService {

    private final WebClient webClient;

    public EvaluationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://emkc.org/api/v2/piston/execute")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public boolean testCode(List<TestUnitaire> testUnitaires, String codeReponse, String language,String fileName) {
        try {
            int successCount = 0;

            for (TestUnitaire test : testUnitaires) {

                JSONObject file = new JSONObject();
                file.put("name", fileName);
                file.put("content", codeReponse);

                JSONArray fileArray = new JSONArray();
                fileArray.put(file);

                JSONObject payload = new JSONObject();
                payload.put("language", language);
                payload.put("version", "*");
                payload.put("files", fileArray);
                payload.put("stdin", test.getInput());
                payload.put("args", new JSONArray());
                payload.put("compile_timeout", 10000);
                payload.put("run_timeout", 3000);
                payload.put("compile_memory_limit", -1);
                payload.put("run_memory_limit", -1);

                Mono<String> responseMono = webClient.post()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(payload.toString())
                        .retrieve()
                        .bodyToMono(String.class);

                String response = responseMono.block();
                JSONObject result = new JSONObject(response);
                System.out.println(result);
                String actualOutput = result.optJSONObject("run").optString("stdout", "").trim();

                String expectedOutput = ((String) test.getExpectedOutput()).trim();

                if (actualOutput.equals(expectedOutput)) {
                    successCount++;
                } else {
                    System.out.println("Test échoué:");
                    System.out.println("Entrée: " + test.getInput());
                    System.out.println("Sortie attendue: " + expectedOutput);
                    System.out.println("Sortie réelle: " + actualOutput);
                }
            }

            System.out.println("Tests réussis : " + successCount + " sur " + testUnitaires.size());


            return successCount == testUnitaires.size();

        } catch (Exception e) {
            System.out.println("Erreur lors de l'exécution des tests : " + e.getMessage());
            return false;
        }
    }

    public boolean testTheorique(int indice,int responce){
        return indice == responce;
    }


}
