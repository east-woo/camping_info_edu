# 1. 베이스 이미지 선택 (OpenJDK 17 사용)
FROM eclipse-temurin:17-jdk-jammy

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. JAR 파일 복사
COPY target/camping_info-0.0.1-SNAPSHOT.jar /app/camping_info-0.0.1-SNAPSHOT.jar

# 4. 컨테이너가 실행될 때 실행할 명령어
CMD ["java", "-jar", "/app/camping_info-0.0.1-SNAPSHOT.jar"]