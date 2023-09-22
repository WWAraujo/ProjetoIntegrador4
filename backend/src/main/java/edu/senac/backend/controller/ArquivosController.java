package edu.senac.backend.controller;

import edu.senac.backend.arquivos.ArquivosRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:4200/")
public class ArquivosController {

    @Value("${upload.directory}")
    private String uploadDirectory;

    @PostMapping
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo vazio.");
            }

            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String nomeArquivoOriginal = file.getOriginalFilename();
            ArquivosRecord novoNomeArquivo = gerarNomeArquivoUnico(uploadDirectory, nomeArquivoOriginal);


            String caminhoCompleto = uploadDirectory + File.separator + novoNomeArquivo.nomeImg();
            File arquivoSalvo = new File(caminhoCompleto);


            Path filePath = Paths.get(uploadDirectory, novoNomeArquivo.nomeImg());
            file.transferTo(filePath);


            System.out.println(novoNomeArquivo);
            return ResponseEntity.ok(novoNomeArquivo);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer o upload do arquivo.");
        }
    }

    @GetMapping("/{imageName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Path imagePath = Paths.get(uploadDirectory, imageName);
        Resource resource;

        try {
            resource = new UrlResource(imagePath.toUri());
        } catch (MalformedURLException e) {

            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    public static ArquivosRecord gerarNomeArquivoUnico(String caminhoDiretorio, String nomeOriginalArquivo) {
        String nomeBase = nomeOriginalArquivo.substring(0, nomeOriginalArquivo.lastIndexOf('.'));
        String extensao = nomeOriginalArquivo.substring(nomeOriginalArquivo.lastIndexOf('.'));

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = dateFormat.format(new Date());

        Random random = new Random();
        int numeroAleatorio = random.nextInt(10000); // Número aleatório entre 0 e 9999

        String novoNomeArquivo = nomeBase + "_" + timestamp + "_" + numeroAleatorio + extensao;

        // Verifica se o nome de arquivo já existe no diretório
        File diretorio = new File(caminhoDiretorio);
        if (!diretorio.exists()) {
            diretorio.mkdirs();
        }

        File arquivo = new File(caminhoDiretorio + File.separator + novoNomeArquivo);
        while (arquivo.exists()) {
            // Se o arquivo com o mesmo nome já existe, gere um novo número aleatório
            numeroAleatorio = random.nextInt(10000);
            novoNomeArquivo = nomeBase + "_" + timestamp + "_" + numeroAleatorio + extensao;
            arquivo = new File(caminhoDiretorio + File.separator + novoNomeArquivo);
        }

        ArquivosRecord response = new ArquivosRecord(timestamp.toString(), novoNomeArquivo , caminhoDiretorio, null);

        return response;
    }

}

