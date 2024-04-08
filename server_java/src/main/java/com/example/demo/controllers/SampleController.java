package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.example.demo.models.SampleModel;
import com.example.demo.repositories.SampleRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@RestController
@RequestMapping("/api/sample")
public class SampleController {

    @Autowired
    private SampleRepository sampleRepository;

    private final ExecutorService executorService = Executors.newFixedThreadPool(10);

    private DeferredResult<ResponseEntity<List<SampleModel>>> runInNewThreadAndGetResult() {
        DeferredResult<ResponseEntity<List<SampleModel>>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                List<SampleModel> samples = sampleRepository.findAll();
                ResponseEntity<List<SampleModel>> responseEntity = new ResponseEntity<>(samples, HttpStatus.OK);
                deferredResult.setResult(responseEntity);
            } catch (Exception e) {
                ResponseEntity<List<SampleModel>> responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                deferredResult.setResult(responseEntity);
            }
        });

        return deferredResult;
    }

    private DeferredResult<ResponseEntity<SampleModel>> runInNewThreadAndPostResult(SampleModel sample) {
        DeferredResult<ResponseEntity<SampleModel>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                SampleModel savedSample = sampleRepository.save(sample);
                ResponseEntity<SampleModel> responseEntity = new ResponseEntity<>(savedSample, HttpStatus.CREATED);
                deferredResult.setResult(responseEntity);
            } catch (Exception e) {
                ResponseEntity<SampleModel> responseEntity = new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                deferredResult.setResult(responseEntity);
            }
        });

        return deferredResult;
    }

    private DeferredResult<ResponseEntity<SampleModel>> runInNewThreadAndGetByIdResult(String id) {
        DeferredResult<ResponseEntity<SampleModel>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                Optional<SampleModel> sampleData = sampleRepository.findById(id);
                if (sampleData.isPresent()) {
                    ResponseEntity<SampleModel> responseEntity = new ResponseEntity<>(sampleData.get(), HttpStatus.OK);
                    deferredResult.setResult(responseEntity);
                } else {
                    deferredResult.setResult(new ResponseEntity<>(HttpStatus.NOT_FOUND));
                }
            } catch (Exception e) {
                deferredResult.setResult(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
            }
        });

        return deferredResult;
    }

    private DeferredResult<ResponseEntity<SampleModel>> runInNewThreadAndUpdateResult(String id, SampleModel updatedSample) {
        DeferredResult<ResponseEntity<SampleModel>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                Optional<SampleModel> sampleData = sampleRepository.findById(id);
                if (sampleData.isPresent()) {
                    SampleModel existingSample = sampleData.get();
                    existingSample.setName(updatedSample.getName());
                    SampleModel savedSample = sampleRepository.save(existingSample);
                    ResponseEntity<SampleModel> responseEntity = new ResponseEntity<>(savedSample, HttpStatus.OK);
                    deferredResult.setResult(responseEntity);
                } else {
                    deferredResult.setResult(new ResponseEntity<>(HttpStatus.NOT_FOUND));
                }
            } catch (Exception e) {
                deferredResult.setResult(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
            }
        });

        return deferredResult;
    }

    private DeferredResult<ResponseEntity<HttpStatus>> runInNewThreadAndDeleteResult(String id) {
        DeferredResult<ResponseEntity<HttpStatus>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                Optional<SampleModel> sampleData = sampleRepository.findById(id);
                if (sampleData.isPresent()) {
                    sampleRepository.deleteById(id);
                    deferredResult.setResult(new ResponseEntity<>(HttpStatus.NO_CONTENT));
                } else {
                    deferredResult.setResult(new ResponseEntity<>(HttpStatus.NOT_FOUND));
                }
            } catch (Exception e) {
                deferredResult.setResult(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
            }
        });

        return deferredResult;
    }

    private DeferredResult<ResponseEntity<HttpStatus>> runInNewThreadAndDeleteAllResult() {
        DeferredResult<ResponseEntity<HttpStatus>> deferredResult = new DeferredResult<>();

        executorService.submit(() -> {
            try {
                sampleRepository.deleteAll();
                deferredResult.setResult(new ResponseEntity<>(HttpStatus.NO_CONTENT));
            } catch (Exception e) {
                deferredResult.setResult(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
            }
        });

        return deferredResult;
    }

    @GetMapping("")
    public DeferredResult<ResponseEntity<List<SampleModel>>> triggerRunInNewThread() {
        return runInNewThreadAndGetResult();
    }

    @PostMapping("")
    public DeferredResult<ResponseEntity<SampleModel>> createSample(@RequestBody SampleModel sample) {
        return runInNewThreadAndPostResult(sample);
    }

    @GetMapping("/{id}")
    public DeferredResult<ResponseEntity<SampleModel>> getSampleById(@PathVariable String id) {
        return runInNewThreadAndGetByIdResult(id);
    }

    @PutMapping("/{id}")
    public DeferredResult<ResponseEntity<SampleModel>> updateSample(@PathVariable String id, @RequestBody SampleModel updatedSample) {
        return runInNewThreadAndUpdateResult(id, updatedSample);
    }

    @DeleteMapping("/{id}")
    public DeferredResult<ResponseEntity<HttpStatus>> deleteSample(@PathVariable String id) {
        return runInNewThreadAndDeleteResult(id);
    }

    @DeleteMapping("")
    public DeferredResult<ResponseEntity<HttpStatus>> deleteAllSamples() {
        return runInNewThreadAndDeleteAllResult();
    }
}
