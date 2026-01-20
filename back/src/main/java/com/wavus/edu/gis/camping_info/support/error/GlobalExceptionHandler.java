package com.wavus.edu.gis.camping_info.support.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApi(ApiException e) {
        ErrorCode ec = e.getErrorCode();

        return ResponseEntity
                .status(ec.getStatus())
                .body(new ErrorResponse(
                        ec.getCode(),
                        ec.getMessage(),
                        ec.getStatus().value()
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {

        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(
                        ErrorCode.INVALID_INPUT.getCode(),
                        e.getBindingResult().getAllErrors().get(0).getDefaultMessage(),
                        400
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleEtc(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(
                        ErrorCode.INTERNAL_ERROR.getCode(),
                        ErrorCode.INTERNAL_ERROR.getMessage(),
                        500
                ));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException e) {

        ErrorCode ec = ErrorCode.INVALID_PARAMETER_TYPE;

        return ResponseEntity
                .status(ec.getStatus())
                .body(new ErrorResponse(
                        ec.getCode(),
                        ec.getMessage(),
                        ec.getStatus().value()
                ));
    }

}
